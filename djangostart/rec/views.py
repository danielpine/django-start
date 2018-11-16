# -*-coding:utf-8 -*-
import json
import random
import threading
import time
import uuid
from collections import defaultdict

import dwebsocket
# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render
from dwebsocket import accept_websocket, require_websocket

from rec.tankgame.room import Room
from rec.tankgame.settings import Settings
from rec.tankgame.tank import Tank

usr_dict = defaultdict(list)

tank_settings = Settings()

room = defaultdict(list)

channelid = str(uuid.uuid1())

room[channelid] = Room()


def index(request):
    return HttpResponse("Hello, world. You're at the rec index.哈哈")


def login(request):
    return HttpResponse("")


def hello(request):
    return render(request, 'hello.html')


def robot(request):
    return render(request, 'robot.html')


@require_websocket  #只接受websocket请求，不接受http请求，这是调用了dwebsocket的装饰器
def websocket_test(request):
    message = request.websocket.wait()
    request.websocket.send("reply:" + message)


@accept_websocket  #既能接受http也能接受websocket请求
def echo(request):
    if not request.is_websocket():
        try:
            message = request.GET['message']
            return HttpResponse(message)
        except:
            return render(request, 'app02/user2.html')
    else:
        u = request.session['u']
        u = request.GET.get('user')
        usr_dict[u] = request.websocket
        print(usr_dict)
        for message in request.websocket:
            try:
                if len(message) <= 140 and '*' in message:
                    print(u)
                    msg_info = str(message, 'utf-8').split('*#*#*')
                    sendby = msg_info[0]
                    msg = msg_info[1]
                    sendto = msg_info[2]
                    print(sendby, msg, sendto)
                    usr_dict[sendto].send(message + ''.encode('utf-8'))
                else:
                    if 'replay' in usr_dict:
                        #print('replay', len(message))
                        usr_dict['replay'].send(message)
            except Exception as e:
                print(e)


@accept_websocket  #既能接受http也能接受websocket请求
def tank(request):
    clientid = request.GET.get('clientid')
    last_roomid = -1
    userinfo = {'clientid': clientid, 'channelid': channelid}
    request.session['userinfo'] = userinfo
    request.websocket.send(json.dumps(userinfo).encode('utf8'))
    print(clientid, ':连接成功')
    for message in request.websocket:
        try:
            jmsg = json.loads(message.decode('utf8'))
            code = jmsg['code']
            if code:
                # print(message)
                if code == 1111:  #game_status
                    t = Tank(channelid, clientid, random.randint(140, 1300),
                             random.randint(140, 700), random.randint(0, 3),
                             tank_settings)
                    color = [tank_settings.random_color(), '#00FFFF']
                    # print(color)
                    t.tank_color = color
                    user = {"id": clientid, "roomid": channelid, 'tank': t}
                    room[channelid].add_user_requests(clientid, request)
                    room[channelid].add_user(user)
                    room[channelid].add_battling_user(user)
                    room[channelid].fun_timer(request)
                elif code == 1000:  #
                    pass
                    # print(code)
                elif code == 1001:  #get_players
                    pass
                    # print(code)
                    #request.websocket.send(json.dumps(channel).encode('utf8'))
                elif code == 1002:  #in_room
                    roomid = int(jmsg['data'])
                    if roomid in room:
                        room[roomid][clientid] = {}
                        if last_roomid == -1:
                            last_roomid = roomid
                        else:
                            room[last_roomid].pop(clientid)
                        request.websocket.send(
                            json.dumps({
                                'roomid': roomid
                            }).encode('utf8'))
                    else:
                        request.websocket.send(
                            json.dumps({
                                'roomid': '-1'
                            }).encode('utf8'))

                elif code == 1003:  #get_rooms
                    request.websocket.send(
                        json.dumps({
                            'rooms': room
                        }).encode('utf8'))
                elif code == 2222:  #game_cmd
                    """
                    {"code":2222,"type":"getrooms","message":"","data":{clientid:1,cmd:0,1,2,3}}
                    """
                    cmd_data = jmsg['data']
                    rcid = cmd_data['clientid']
                    rcmd = cmd_data['cmd']
                    battle_ing = room[channelid].battling[clientid]['tank']
                    # print(battle_ing)
                    # print(rcid, rcmd)
                    if rcmd == 87 or rcmd == 38:
                        battle_ing.move(0)
                        # print('↑')
                    elif rcmd == 68 or rcmd == 39:
                        battle_ing.move(1)
                        # print('→')
                    elif rcmd == 83 or rcmd == 40:
                        battle_ing.move(2)
                        # print('↓')
                    elif rcmd == 65 or rcmd == 37:
                        battle_ing.move(3)
                        # print('←')
                    elif rcmd == 32:
                        battle_ing.shot()
                        # print('shot')
                    request.websocket.send(
                        json.dumps({
                            "code":
                            1111,
                            "status":
                            1,
                            "type":
                            "game_status",
                            "message":
                            "normal",
                            "data":
                            json.loads(
                                json.dumps(
                                    room[channelid].battling,
                                    default=lambda o: o.__dict__,
                                    sort_keys=True))
                        }).encode('utf8'))
                else:
                    pass
                    # print(code)
            else:
                pass

        except Exception as e:
            print(e)
