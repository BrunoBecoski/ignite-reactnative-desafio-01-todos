import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';
import { ItemWrapper } from './ItemWrapper';

import xIcon from '../assets/icons/x/x.png';
import penIcon from '../assets/icons/pen/pen.png';
import trashIcon from '../assets/icons/trash/trash.png';

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (idTask: number, taskNewTitle: string) => void;
}

export function TaskItem({ 
  index, 
  task, 
  toggleTaskDone, 
  removeTask, 
  editTask
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskNewTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={taskNewTitle}
            onChangeText={setTaskNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>

      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {isEditing ?
          <TouchableOpacity
            testID={`pen-${index}`}
            style={{ paddingRight: 12 }}
            onPress={handleCancelEditing}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
          :
          <TouchableOpacity
            testID={`pen-${index}`}
            style={{ paddingRight: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        }

        <View
          style={{ width: 1, height: 24, backgroundColor: '#C4C4C43C' }}
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingLeft: 12, paddingRight: 24 }}
          //TODO - use onPress (remove task) prop
          onPress={() => !isEditing && removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={isEditing && { opacity: .2 }}
          />
        </TouchableOpacity>
      </View>

    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})