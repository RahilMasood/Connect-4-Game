# Connect-4 AI Game (Human vs Machine)

**Connect-4 AI** is a full-stack web app that lets you play the classic **Connect-4** game against an intelligent AI opponent!  
The frontend is built using **React.js**, while the backend runs a **Python AI engine** powered by the **Minimax algorithm with Alpha-Beta Pruning**.

---

## Features

- **Interactive UI** built with React (click or drag to drop tokens)
- **AI Opponent** using Minimax + Alpha-Beta pruning
- **Real-time gameplay** — smooth turns between player and AI
- **Responsive design** for desktop and mobile

---

## AI Logic (Minimax + Alpha-Beta Pruning)

The AI analyzes possible future board states using the Minimax algorithm, with Alpha-Beta pruning to optimize search time.
It evaluates board positions based on:
- Number of 2-in-a-rows, 3-in-a-rows, and potential 4-connects
- Center column preference (for strategic advantage)
- Blocking opponent’s winning moves
- Number of 2-in-a-rows, 3-in-a-rows, and potential 4-connects
- Center column preference (for strategic advantage)

---

## Demo:

<img width="766" height="810" alt="Example" src="https://github.com/user-attachments/assets/d36623d9-6f5c-42e3-97a4-9f29cdacd20f" />

## License

This project is licensed under the MIT License
Blocking opponent’s winning moves

