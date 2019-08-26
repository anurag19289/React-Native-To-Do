import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode,setIsAddMode] = useState(false);
  const addGoalInputHandler = (goalTitle) => {
    if(goalTitle.length === 0) return;
    setCourseGoals((currentGoals) => [...currentGoals, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);

    //settting two states after each other
    //it will batch these together
    //it will not re render the component twice 
    //apply all state changes once
  };
  const deleteGoal = (goalId) => {
    setCourseGoals(currentgls => {
      console.log(currentgls);
      return currentgls.filter(goal => goal.id !== goalId);
    });
  }

  const cancelGoalInputHandler = () =>{
    setIsAddMode(false);
  }
  
  return (
    <View style={styles.container}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}></Button>
      <GoalInput visibleAddMode={isAddMode} onCancel={cancelGoalInputHandler} onAddGoal={addGoalInputHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem onDelete={deleteGoal} goalId={itemData.item.id} title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  }
});




