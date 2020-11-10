import threading
import json
import random
import uuid
import time
from rec.tankgame.settings import Settings
from rec.tankgame.tank import Tank


class Room():
    def __init__(self):
        '''
        0: battling         
        1: matching         
        2: waiting          
        3: paspausing '''
        self.channelid = None
        self.game_status = 2
        self.battling = {}
        self.ai = {}
        self.ai_falsh_time = 0
        self.users = []
        self.user_requests = {}
        self.timer = None
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
            for but_id in buts:
                for but_check_k in self.battling:
                    if k is not but_check_k and buts[but_id].is_live:
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
                            buts[but_id].is_live = False
                            enemy_tank.tank_blood -= 1
                            # print(enemy_tank.id, enemy_tank.tank_blood)
                            if enemy_tank.tank_blood < 1 and enemy_tank.isLive:
                                # print(enemy_tank.id, 'dead!')
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
                            elif enemy_tank.isLive:
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
                if buts[but_id].is_live:
                    is_the_edge = buts[but_id].run()
                    # 边缘检测
                    if is_the_edge:
                        dead_buts.append(but_id)
            for but_id in dead_buts:
                buts.pop(but_id)
        dead_tanks = []
        for k in self.battling:
            tank = self.battling[k]['tank']
            if not tank.isLive:
                dead_tanks.append(k)
        for dead_tank_id in dead_tanks:
            self.battling.pop(dead_tank_id)
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
        self.timer = threading.Timer(0.01, self.fun_timer, (request, ))
        self.timer.start()  #启用定时器
        self.count += 1

    def flash_game_interval(self):
        for k in self.battling:
            #print(k)
            buts = self.battling[k]['tank'].get_bullets()
            this_tank = self.battling[k]['tank']
            dead_buts = []
            for but_id in buts:
                for but_check_k in self.battling:
                    enemy_tank = self.battling[but_check_k]['tank']
                    if k is not but_check_k and buts[but_id].is_live and not (
                            this_tank.type == 1 and enemy_tank.type == 1):
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
                            buts[but_id].is_live = False
                            enemy_tank.tank_blood -= 1
                            # print(enemy_tank.id, enemy_tank.tank_blood)
                            if enemy_tank.tank_blood < 1 and enemy_tank.isLive:
                                # print(enemy_tank.id, 'dead!')
                                # id humen
                                if enemy_tank.type == 0:
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
                            elif enemy_tank.isLive:
                                if enemy_tank.type == 0:
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
                                                buts[but_id].tankid + "," +
                                                str(enemy_tank.tank_blood) +
                                                ' drops of blood left',
                                                "data":
                                                enemy_tank.tank_blood
                                            }).encode('utf8'))
                #print(buts[but_id].x, buts[but_id].y)
                if buts[but_id].is_live:
                    is_the_edge = buts[but_id].run()
                    # 边缘检测
                    if is_the_edge:
                        dead_buts.append(but_id)
            for but_id in dead_buts:
                buts.pop(but_id)
        dead_tanks = []
        for k in self.battling:
            tank = self.battling[k]['tank']
            if not tank.isLive:
                dead_tanks.append(k)
        for dead_tank_id in dead_tanks:
            self.battling.pop(dead_tank_id)
            if dead_tank_id in self.ai:
                self.ai.pop(dead_tank_id)
        # ai interval
        self.flash_ai_interval()
        # send game data interval.
        self.send_game_data_interval()
        if self.game_status == 0:
            self.timer = threading.Timer(0.01, self.flash_game_interval)
            self.timer.start()  #启用定时器
            self.count += 1
        else:
            print('GAME RUN FAILED: ', self.game_status)

    def send_game_data_interval(self):
        for k in self.user_requests:
            request = self.user_requests[k]
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

    def start(self):
        if self.game_status == 0:
            pass
        else:
            self.game_status = 0
            self.flash_game_interval()
            # add 10 ai tank
            self.add_ai(6)

    def add_ai(self, num):
        if self.game_status == 0:
            for ai_id in self.ai:
                self.battling.pop(ai_id)
            self.ai = {}
            for i in range(num):
                ai_id = 'ai_' + str(uuid.uuid1())
                t = Tank(self.channelid, ai_id, random.randint(140, 1300),
                         random.randint(140, 700), random.randint(0, 3),
                         Settings())
                t.type = 1
                color = ['#FF0000', '#FF4500']
                # print(color)
                t.tank_color = color
                t.tank_speed = 1
                user = {"id": ai_id, "roomid": self.channelid, 'tank': t}
                self.add_battling_user(user)
                self.ai[ai_id] = t

    def flash_ai_interval(self):
        now = int(time.time() * 1000)
        for ai_id in self.ai:
            tank = self.ai[ai_id]
            #随机方向
            if now - tank.ai_falsh_time > random.randint(700, 1400):
                tank.direct = random.randint(0, 3)
                tank.ai_falsh_time = now
            tank.move(tank.direct)
            if random.randint(
                    0,
                    10) < 5 and now - tank.ai_last_shot_time > random.randint(
                        500, 1000):
                tank.shot(tank.direct)
                tank.ai_last_shot_time = now

    def run(self):
        self.start()
