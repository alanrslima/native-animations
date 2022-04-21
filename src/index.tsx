import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "./screens/Menu/Menu";
import * as Modules from "./modules";

const Stack = createNativeStackNavigator();

const Main: React.FC = () => {
  const getModulesArray = () => {
    const arrModules = [];
    for (let i in Modules) {
      arrModules.push({ name: i, component: (Modules as any)[i] });
    }
    return arrModules;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        {getModulesArray().map((i) => (
          <Stack.Screen key={i.name} name={i.name} component={i.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
