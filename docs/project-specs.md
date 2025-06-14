# Project Specifications

## Overview

* `Project Name`
  > PixaMory
* `Description`
  > Would you like to enhance your visual memory by putting it to the test? Let us see how many turns it takes you to reveal the entire board. You will be able to select from a wide range of image collections that will always surprise you because they are acquired at random from PixaBay servers. This should increase the game's interest and make it quite unpredictable. When you believe you are improving, try a more difficult level. Keep track of your scores and compare them with your previous ones. Push yourself to the *limit* and try to beat your best score. Enjoy the challenge and have fun!
* `Version`
  > 1.0.2

## Technology Stack

* `Frontend`
  > React Native, Expo
* `State Management`
  > Zustand
* `Animation Library`
  > React Native Reanimated
* `UI Components`
  > Custom components built using React Native and Tailwind CSS
* `Storage`
  > AsyncStorage

## Directory Structure

| Name         | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| `app`        | The main application code, including tabs, game logic, and UI components.                  |
| `components` | Reusable UI components, such as cards, buttons, and tables.                                |
| `hooks`      | Custom hooks for animation, game logic, and state management.                              |
| `stores`     | Zustand stores for game state and high score management.                                   |
| `assets`     | Image assets used in the game.                                                             |
| `constants`  | Constants used throughout the application, such as card data and animation configurations. |

## Features

* `Game logic`
  > The game features a memory matching mechanic, where players must match pairs of cards.
* `Difficulty levels`
  > The game includes multiple difficulty levels, which affect the number of cards and game duration.
* `High score tracking`
  > The game tracks high scores for each difficulty level.
* `Animation`
  > The game features animated transitions and effects using React Native Reanimated.

## Build and Deployment

* The application is built using Expo's build process.
* The application is deployed to the Expo client for testing and debugging.