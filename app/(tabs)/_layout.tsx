import { Stack } from 'expo-router';
import React from 'react';




export default function TabLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',

        }}
      />
      <Stack.Screen
        name="gamePlay"
        options={{
          title: 'GamePlay',
        }}
      />
    </Stack>
  );
}
