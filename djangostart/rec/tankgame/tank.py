# -*- coding: utf-8 -*-
import uuid
import random


class Tank():
    def __init__(self, roomid, id, x, y, direct, settings):
        self.roomid = roomid
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
        self.y -= self.tank_speed
        self.direct = 0

    def right(self):
        self.x += self.tank_speed
        self.direct = 1

    def down(self):
        self.y += self.tank_speed
        self.direct = 2

    def left(self):
        self.x -= self.tank_speed
        self.direct = 3

    def shot(self):
        if len(self.bullets) <= 30:
            from rec.tankgame.bullet import Bullet
            bid = str(uuid.uuid1()) + '-' + str(random.randint(0, 9)) + str(
                random.randint(0, 9)) + str(random.randint(0, 9)) + str(
                    random.randint(0, 9))
            self.bullets[bid] = Bullet(
                self.x + self.settings.bulletDirect[self.direct][0],
                self.y + self.settings.bulletDirect[self.direct][1],
                self.direct, self.bullte_speed, self.id, bid)
            return 1
        else:
            print("Bullet Not > 30 !")
            return "Bullet Not > 30 !"
