# -*- coding: utf-8 -*-
import uuid
import random
import time
from rec.tankgame.bullet import Bullet
'''
type 0:humen
     1:ai
'''


class Tank():
    def __init__(self, roomid, id, x, y, direct, settings):
        self.roomid = roomid
        self.ai_falsh_time = 0
        self.ai_last_shot_time = 0
        self.type = 0
        self.last_biu_time = 0
        self.id = id
        self.x = x
        self.y = y
        self.isLive = True
        self.direct = direct
        self.bullets = {}
        self.bulletscount = 0
        self.settings = settings
        self.tank_speed = settings.tank_speed
        self.bullte_speed = settings.bullte_speed
        self.tank_blood = settings.tank_blood
        self.tank_color = settings.tank_color

    def get_bullets(self):
        return self.bullets

    def move(self, cmd):
        if cmd == 0:
            self.up()
        elif cmd == 1:
            self.right()
        elif cmd == 2:
            self.down()
        elif cmd == 3:
            self.left()

    def up(self):
        if self.y >= 0:
            self.y -= self.tank_speed
        self.direct = 0

    def right(self):
        if self.x <= 1366 - 30:
            self.x += self.tank_speed
        self.direct = 1

    def down(self):
        if self.y <= 768 - 30:
            self.y += self.tank_speed
        self.direct = 2

    def left(self):
        if self.x >= 0:
            self.x -= self.tank_speed
        self.direct = 3

    def biu(self):
        if (time.time() - self.last_biu_time) > self.settings.biu_delay:
            self.x=random.randint(140, 1300)
            self.y=random.randint(140, 700)
            self.direct=random.randint(0, 3) 
            self.last_biu_time = time.time()
        else:
            pass


    def shot(self,direct):
        if len(self.bullets) <= 3000:
            this_direct = self.direct
            if  direct == 38:
                this_direct=0
                # print('↑')
            elif direct == 39:
                this_direct=1
                # print('→')
            elif direct == 40:
                this_direct=2
                # print('↓')
            elif direct == 37:
                this_direct=3
            bid = str(uuid.uuid1()) + '-' + str(random.randint(0, 9)) + str(
                random.randint(0, 9)) + str(random.randint(0, 9)) + str(
                    random.randint(0, 9))
            self.bullets[bid] = Bullet(
                self.x + self.settings.bulletDirect[this_direct][0],
                self.y + self.settings.bulletDirect[this_direct][1],
                this_direct, self.bullte_speed, self.id, bid)
            return 1
        else:
            print("Bullet Not > 10 !")
            return "Bullet Not > 10 !"
