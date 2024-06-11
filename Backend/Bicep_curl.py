#import libraries

import cv2
import mediapipe as mp
import numpy as np
mp_drawing=mp.solutions.drawing_utils
mp_pose=mp.solutions.pose

#calculate angles between joints

def calculate_angle(a,b,c):
    a = np.array(a)  #first angle
    b = np.array(b)  #second angle
    c = np.array(c)  #third angle
    
    radians = np.arctan2(c[1]-b[1],c[0]-b[0]) - np.arctan2(a[1]-b[1],a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle>180.0:
        angle = 360-angle
    return angle

def classify_bicep_curl(angle_1, angle_2):
    if angle_1 > 160 and angle_2 > 160:
        return "Good form - Keep it up!"
    elif angle_1 > 140 and angle_2 > 140:
        return "Great range of motion - Maintain this level"
    elif angle_1 > 120 and angle_2 > 120:
        return "Partial curl - Aim for greater range of motion"
    elif angle_1 < 90 and angle_2:  # Adjust this threshold as needed
        return "Bad form - Don't swing or use momentum"
    else:
        return "Keep elbows close to body and aim for greater range of motion"
    
#Curl Counter
cap = cv2.VideoCapture(0)
#creating curl counter variable
counter = 0
stage = None
## Setup mediapipe instance
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        
        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
      
        # Make detection
        results = pose.process(image)
    
        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        # Extract landmarks
        try:
            landmarks = results.pose_landmarks.landmark
            
            # Get coordinates
            left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            
            right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
            right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
            right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
            
            # Calculate angle
            angle_1 = calculate_angle(left_shoulder, left_elbow, left_wrist)
            angle_2=calculate_angle(right_shoulder,right_elbow,right_wrist)
            
            feedback = classify_bicep_curl(angle_1, angle_2)
            
            cv2.putText(image, feedback, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            # Visualize angle
          #  cv2.putText(image, str(angle_1), 
                           #tuple(np.multiply(left_elbow, [640, 480]).astype(int)), 
                          # cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                              #  )
            
          #  cv2.putText(image, str(angle_2), 
                         #  tuple(np.multiply(right_elbow, [640, 480]).astype(int)), 
                          # cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                           #     )
            
            #CURL COUNTER LOGIC
            if angle_1 > 160 and angle_2 >160 :
                stage = "Down"
            if angle_1 < 30 and angle_2 < 30 and stage == 'Down':
                stage = "up"
                counter +=1
                print(counter)
                       
        except:
            pass
        
        #setting up curl counter box
        cv2.rectangle(image, (0,0), (700,73), (245,117,16), -1)
        
        #sending values to curl counter box
        cv2.putText(image, feedback, (60,60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        cv2.putText(image, str(counter), 
                    (10,60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        
        #printing hand stage while exercising
        
      #  cv2.putText(image, 'STAGE', (165,12), 
       #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
        #cv2.putText(image, stage, 
         #           (165,60), 
          #          cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)
        
        cv2.rectangle(image, (0, image.shape[0] - 30), (200, image.shape[0]), (255, 0, 0), -1)  # Blue rectangle in the bottom-left corner
        cv2.putText(image, stage , (5, image.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)  # White text inside the rectangle
      #  cv2.putText(image, 'DOUBLE BICEP CURLS', (390,18), 
                    #cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 1, cv2.LINE_AA)
        
        
        
      #  if counter >3 :
                   # cv2.rectangle(image, (40,200), (600,72), (255,255,255), -1)
                
                
                    #cv2.putText(image, 'Please Stop Workout!!!', (60,150), 
                   # cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 1, cv2.LINE_AA)
        
        # Render detections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                 )               
        
        cv2.imshow('VIDEO', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()