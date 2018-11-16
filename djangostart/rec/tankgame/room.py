import threading
import json
import random


class Room():
    def __init__(self):
        self.battling = {}
        self.users = []
        self.user_requests = {}
        self.timer = None
        self.game_status = 0
        self.count = 0

    def add_user(self, user):
        self.users.append(user['id'])

    def add_user_requests(self, clientid, request):
        self.user_requests[clientid] = request

    def add_battling_user(self, user):
        self.battling[user['id']] = user

    def show_status(self):
        print(
            json.dumps(
                self.battling, default=lambda o: o.__dict__, sort_keys=True),
            '\n')

    def get_json_str_status(self):
        return json.dumps(
            self.battling, default=lambda o: o.__dict__, sort_keys=True)

    def fun_timer(self, request):
        # print('hello timer')  #打印输出
        if False:
            request.websocket.send(
                json.dumps({
                    "code":
                    1111,
                    "status":
                    0,
                    "type":
                    "game_status",
                    "message":
                    "game over",
                    "data":
                    json.loads(
                        json.dumps(
                            self.battling,
                            default=lambda o: o.__dict__,
                            sort_keys=True))
                }).encode('utf8'))
            return
        for k in self.battling:
            #print(k)
            buts = self.battling[k]['tank'].get_bullets()
            dead_buts = []
            dead_tanks = []
            for but_id in buts:
                for but_check_k in self.battling:
                    if k is not but_check_k:
                        enemy_tank = self.battling[but_check_k]['tank']
                        ex = enemy_tank.x + enemy_tank.settings.bulletCheckDirect[
                            enemy_tank.direct][0]
                        ey = enemy_tank.y + enemy_tank.settings.bulletCheckDirect[
                            enemy_tank.direct][1]
                        bx = buts[but_id].x
                        by = buts[but_id].y
                        if bx >= enemy_tank.x and bx <= ex and by >= enemy_tank.y and by <= ey:
                            # print('enemy:', enemy_tank.id, enemy_tank.x,
                            #       enemy_tank.y)
                            # print('mybullet:', buts[but_id].tankid,
                            #       buts[but_id].x, buts[but_id].y)
                            # print('hit')
                            dead_buts.append(but_id)
                            enemy_tank.tank_blood -= 1
                            print(enemy_tank.id, enemy_tank.tank_blood)
                            if enemy_tank.tank_blood < 1 and enemy_tank.isLive:
                                print(enemy_tank.id, 'dead!')
                                self.user_requests[
                                    enemy_tank.id].websocket.send(
                                        json.dumps({
                                            "code":
                                            1111,
                                            "status":
                                            4,
                                            "type":
                                            "game_status",
                                            "message":
                                            "You are killed by " +
                                            buts[but_id].tankid,
                                            "data":
                                            enemy_tank.id
                                        }).encode('utf8'))
                                enemy_tank.isLive = False
                            else:
                                self.user_requests[
                                    enemy_tank.id].websocket.send(
                                        json.dumps({
                                            "code":
                                            1111,
                                            "status":
                                            3,
                                            "type":
                                            "game_status",
                                            "message":
                                            "You are hit by " +
                                            buts[but_id].tankid + "," + str(
                                                enemy_tank.tank_blood) +
                                            ' drops of blood left',
                                            "data":
                                            enemy_tank.tank_blood
                                        }).encode('utf8'))
                #print(buts[but_id].x, buts[but_id].y)
                is_the_edge = buts[but_id].run()
                # 边缘检测
                if is_the_edge:
                    dead_buts.append(but_id)
            for but_id in dead_buts:
                buts.pop(but_id)
        for k in self.battling:
            #print(k)
            tank = self.battling[k]['tank']
            if not tank.isLive:
                self.battling[k].pop(tank.id)
        #self.show_status()
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
                        self.battling,
                        default=lambda o: o.__dict__,
                        sort_keys=True))
            }).encode('utf8'))
        self.timer = threading.Timer(0.1, self.fun_timer,
                                     (request, ))  #60秒调用一次函数
        #定时器构造函数主要有2个参数，第一个参数为时间，第二个参数为函数名
        self.timer.start()  #启用定时器
        self.count += 1
