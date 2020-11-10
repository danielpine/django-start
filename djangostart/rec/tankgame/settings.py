# -*- coding: utf-8 -*-

import random


class Settings():
    """存储所有设置的类"""

    def __init__(self):
        """初始化游戏设置"""
        #屏幕设置
        self.biu_delay = 10
        self.screen_width = 1366
        self.screen_height = 768
        self.color_arr = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D',
            'E', 'F'
        ]
        self.tank_color = ['#BA9658', '#FEF26E']
        # 坦克的设置
        self.tank_speed = 10
        self.tank_blood = 9
        self.bullte_speed = 18
        self.bulletDirect = {
            0: [9, 0],
            1: [30, 9],
            2: [9, 30],
            3: [0, 9],
        }
        self.bulletCheckDirect = {
            0: [20, 30],
            2: [20, 30],
            1: [30, 20],
            3: [30, 20],
        }

    def random_color(self):
        return "#" + ''.join([
            self.color_arr[random.randint(8, 14)] for i in range(2)
        ]) + ''.join([
            self.color_arr[random.randint(5, 14)] for i in range(2)
        ]) + ''.join([self.color_arr[random.randint(6, 14)] for i in range(2)])
