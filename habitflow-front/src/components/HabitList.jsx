import React, { useState, useEffect } from "react";
import HabitEditForm from './HabitEditForm';
import "./HabitList.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function HabitList({ token }) {
    const [habits, setHabits] = useState([]);
    const [editingHabit, setEditingHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ============================
    // CARGAR HÁBITOS 
    // ============================
    useEffect(() => {
        const fetchHabits = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/api/habits`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Error al obtener los hábitos");

                const data = await response.json();
                setHabits(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHabits();
    }, [token]); 

    // ============================
    // EDITAR HÁBITO 
    // ============================
    const handleStartEdit = (habit) => {
        setEditingHabit(habit);
    };

    const handleCancelEdit = () => {
        setEditingHabit(null);
    };

    const handleHabitUpdated = (updatedHabitResponse) => {
        const updatedHabit = updatedHabitResponse.data || updatedHabitResponse;

        setHabits((prevHabits) =>
            prevHabits.map((habit) =>
                habit._id === updatedHabit._id ? updatedHabit : habit
            )
        );

        setEditingHabit(null);
    };

    // ============================
    // MARCAR COMO COMPLETADO
    // ============================
    const handleToggle = async (habitId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/habits/${habitId}/toggle`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            const updatedDates = data.habit?.completionDates || [];

            setHabits((prev) =>
                prev.map((habit) =>
                    habit._id === habitId
                        ? { ...habit, completionDates: updatedDates }
                        : habit
                )
            );
        } catch (err) {
            console.error("Error al marcar como hecho:", err);
        }
    };

    // ============================
    // ELIMINAR HÁBITO 
    // ============================
    const handleDelete = async (habitId) => {
        if (!window.confirm("¿Seguro que deseas eliminar este hábito?")) return;

        try {
            const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Error al eliminar el hábito");

            setHabits((prev) => prev.filter((habit) => habit._id !== habitId));
        } catch (err) {
            console.error(err.message);
        }
    };

    // ============================
    // RENDER
    // ============================
    if (loading) return <p>Cargando hábitos...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="habit-list-wrapper"> 
            

            {editingHabit && (
                <HabitEditForm
                    habit={editingHabit}
                    token={token}
                    onHabitUpdated={handleHabitUpdated}
                    onCancelEdit={handleCancelEdit}
                />
            )}

            <ul className="habit-list">
                {habits.length === 0 ? (
                    <p>¡No tienes hábitos aún! CREA UNO</p>
                ) : (
                    habits.map((habit) => {
                        const completedToday = habit.completionDates?.some((date) => {
                            const d = new Date(date);
                            const now = new Date();
                            return (
                                d.getDate() === now.getDate() &&
                                d.getMonth() === now.getMonth() &&
                                d.getFullYear() === now.getFullYear()
                            );
                        });

                        return (
                            <li
                                key={habit._id}
                                className={`habit-item ${completedToday ? "completed" : ""}`}
                            >
                                {/* === ÍCONO CÍRCULO A LA IZQUIERDA === */}
                                <div className="habit-left-icon">
                                    <div className="habit-icon-circle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="habit-icon"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* === CONTENIDO DEL HÁBITO === */}
                                <div className="habit-content">
                                    <button className="delete-btn" onClick={() => handleDelete(habit._id)}>
                                        ✕
                                    </button>
                                    

                                    <h3>{habit.name}</h3>
                                    <p>{habit.description}</p>
                                    <p>Frecuencia: {habit.frequency}</p>
                                    <p>🔥 Racha: {habit.completionDates.length} días</p>

                                    <button
                                        className={`habit-check-btn ${completedToday ? "checked" : ""}`}
                                        onClick={() => handleToggle(habit._id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
}

export default HabitList;