# -*- coding:utf-8 -*-

import cv2
import numpy as np
import os

# 分類器(以下から取得)
# https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml

cascade_path = './model/haarcascade_frontalface_default.xml'

# 入出力ディレクトリ
input_path = './data/train/yashu/'
save_path = './data_face/train/yashu/'

#カスケード分類器の特徴量を取得する
faceCascade = cv2.CascadeClassifier(cascade_path)


# 顔検知に成功した数(デフォルトで0を指定)
count = 0

# 指定したフォルダにある全画像を繰り返し処理
file_list = os.listdir(input_path)
for file_name in file_list:
    file_path = input_path + file_name
    #print(file_path)
    # ファイル読み込み
    img = cv2.imread(file_path, cv2.IMREAD_COLOR)
    # グレースケール変換
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # 物体認識（顔認識）の実行
    faces = faceCascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=1, minSize=(30, 30))
    if len(faces) > 0:
        for x, y, w, h in faces:
            # 顔を抜き出し保存
            cv2.imwrite(save_path + 'face_' + str(face_detect_count) + '.jpg', img[y:y+h, x:x+w])
            
            # 二値化
            _ ,binary = cv2.threshold(img[y:y+h, x:x+w], 120, 255, cv2.THRESH_BINARY)
            cv2.imwrite(save_path + 'binary_' + str(face_detect_count) + '.jpg', binary)
        
            count += 1
    else:
        print('NoFace: ' + file_name )

