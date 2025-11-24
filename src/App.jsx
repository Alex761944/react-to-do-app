import "./App.css";
import { useEffect, useState } from "react";
import { ToDo } from "./components/ToDo/ToDo";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { Text } from "./components/Text/Text";
import { Button } from "./components/Button/Button";
import { ToDoListHeader } from "./components/ToDoListHeader/ToDoListHeader";
import { FilterList } from "./components/FilterList/FilterList";
import { Badge } from "./components/Badge/Badge";
import { Filter } from "./components/Filter/Filter";
import { Select } from "./components/Select/Select";
import { Settings } from "lucide-react";
import { Modal } from "./components/Modal/Modal";
import { Icon } from "./components/Icon/Icon";

import { DndContext } from "@dnd-kit/core";

import { Draggable } from "./components/Draggable/Draggable";
import { Droppable } from "./components/Droppable/Droppable";

const sortOptions = [
  { label: "Date Ascending", value: "date-ascending" },
  { label: "Date Descending", value: "date-descending" },
  { label: "Custom", value: "custom" },
];

export const priorityOptions = [
  {
    label: "High",
    value: "high",
    color: "var(--danger)",
  },
  {
    label: "Medium",
    value: "medium",
    color: "var(--warning)",
  },
  {
    label: "Low",
    value: "low",
    color: "var(--success)",
  },
];

const columns = ["backlog", "in-progress", "done"];

function App() {
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem("to-dos")) || []
  );

  const [exportData, setExportData] = useState(null);

  const [selectedSortOption, setSelectedSortOption] = useState(
    localStorage.getItem("selected-sort-option") || "date-ascending"
  );

  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(localStorage.getItem("selected-filters")) || []
  );

  const [droppedOver, setDroppedOver] = useState(null);

  useEffect(() => {
    localStorage.setItem("selected-sort-option", selectedSortOption);
  }, [selectedSortOption]);

  useEffect(() => {
    localStorage.setItem("to-dos", JSON.stringify(toDos));
    setExportData(encodeURIComponent(JSON.stringify(toDos)));
  }, [toDos]);

  useEffect(() => {
    localStorage.setItem("selected-filters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  function addToDo() {
    setToDos((prev) => [
      ...prev.map((toDo) => ({ ...toDo, isInEditMode: false })),
      {
        isDone: false,
        text: `New To Do`,
        isInEditMode: true,
        createdAt: new Date(),
        priority: "medium",
        column: "backlog",
      },
    ]);
  }

  function toggleToDo(timestamp) {
    setToDos((prevToDos) =>
      prevToDos.map((toDo) => {
        if (toDo.createdAt === timestamp) {
          return { ...toDo, isDone: !toDo.isDone };
        }
        return toDo;
      })
    );
  }

  function saveToDo(timestamp, newText, priority, endEditMode = false) {
    setToDos((prevToDos) =>
      prevToDos.map((toDo) =>
        toDo.createdAt === timestamp
          ? {
              ...toDo,
              text: newText,
              isInEditMode: !endEditMode,
              priority: priority,
            }
          : toDo
      )
    );
  }

  function editToDo(timestamp) {
    setToDos((prevToDos) =>
      prevToDos.map((toDo) =>
        toDo.createdAt === timestamp
          ? { ...toDo, isInEditMode: true }
          : { ...toDo, isInEditMode: false }
      )
    );
  }

  function deleteToDo(timestamp) {
    const newToDos = toDos.filter((toDo) => {
      if (toDo.createdAt === timestamp) {
        return false;
      } else {
        return true;
      }
    });

    setToDos(newToDos);
  }

  function sortFunction(toDoA, toDoB) {
    const dateA =
      typeof toDoA.createdAt === "object"
        ? toDoA.createdAt
        : new Date(toDoA.createdAt);
    const dateB =
      typeof toDoB.createdAt === "object"
        ? toDoB.createdAt
        : new Date(toDoB.createdAt);
    if (selectedSortOption === "date-ascending") {
      return dateA > dateB ? 1 : -1;
    } else {
      return dateA < dateB ? 1 : -1;
    }
  }

  function handleFilterChange(value) {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      } else {
        return [...prevFilters, value];
      }
    });
  }

  function handleDragEnd(event) {
    if (!event.over) {
      setDroppedOver(null);
    } else {
      setDroppedOver(event.over.id);
    }
  }

  function handleToDoDragEnd(event) {
    if (!event.over) return;

    setToDos((prevToDos) => {
      return prevToDos.map((toDo) => {
        return toDo.createdAt === event.active.id
          ? { ...toDo, column: event.over.id }
          : toDo;
      });
    });
  }

  return (
    <>
      <Text as="h1" variant="heading-large">
        To-Do List
      </Text>

      <Text as="h2" variant="heading-small">
        Organize your tasks and stay productive.
      </Text>

      <div className="MainContent">
        <ToDoListHeader>
          <Select
            value={selectedSortOption}
            options={sortOptions}
            onChange={(event) => {
              setSelectedSortOption(event.target.value);
            }}
          />

          <FilterList>
            {priorityOptions.map((priorityOption, index) => (
              <li key={index}>
                <Filter
                  value={priorityOption.value}
                  active={selectedFilters.includes(priorityOption.value)}
                  onChange={(event) => {
                    const priority = event.target.value;
                    handleFilterChange(priority);
                  }}
                >
                  <Badge
                    text={priorityOption.label}
                    highlightColor={priorityOption.color}
                    hasActiveState={true}
                  />
                </Filter>
              </li>
            ))}
          </FilterList>
        </ToDoListHeader>

        <ToDoList>
          <DndContext onDragEnd={handleToDoDragEnd}>
            {columns.map((column) => (
              <Droppable id={column}>
                <div className="Column">
                  {toDos
                    .filter((toDo) => toDo.column === column)
                    .filter(
                      (toDo) =>
                        selectedFilters.length === 0 ||
                        selectedFilters.includes(toDo.priority)
                    )
                    .sort(sortFunction)
                    .map((toDo) => (
                      <Draggable key={toDo.createdAt} id={toDo.createdAt}>
                        <li>
                          <ToDo
                            text={toDo.text}
                            priority={toDo.priority}
                            createdAt={toDo.createdAt}
                            isDone={toDo.isDone}
                            isInEditMode={toDo.isInEditMode}
                            onToggle={() => toggleToDo(toDo.createdAt)}
                            handleTrashcanClick={() =>
                              deleteToDo(toDo.createdAt)
                            }
                            handleSave={(newText, priority) =>
                              saveToDo(toDo.createdAt, newText, priority, true)
                            }
                            handleEditClick={() => {
                              editToDo(toDo.createdAt);
                            }}
                            handlePriorityChange={(newText, priority) =>
                              saveToDo(toDo.createdAt, newText, priority)
                            }
                          />
                        </li>
                      </Draggable>
                    ))}
                </div>
              </Droppable>
            ))}
          </DndContext>
        </ToDoList>

        <Button onClick={addToDo}>Add To Do</Button>

        <div className="Settings">
          <Modal triggerIcon={<Icon lucideIcon={<Settings />} />}>
            <Button>Import To Do`s</Button>
            <Button>Export To Do`s</Button>
          </Modal>
        </div>

        <div className="u-Hidden">
          <a
            href={`data:text/plain;charset=utf-8,${exportData}`}
            download={"todo-export.txt"}
          >
            export
          </a>

          <input
            type="file"
            name=""
            id=""
            onChange={(event) => {
              console.log(event);
              fetch("todo-export.txt")
                .then((response) => {
                  console.log(response);
                  return response.text();
                })
                .then((text) => console.log(text));
            }}
          />
        </div>
      </div>

      {/* Build dnd here */}

      <div className="DND-Component">
        <DndContext onDragEnd={handleDragEnd}>
          {!droppedOver && (
            <Draggable>
              <Text>Draggable</Text>
            </Draggable>
          )}

          <Droppable id={"area-1"}>
            <div className="Area">
              Area 1
              {droppedOver === "area-1" && (
                <Draggable>
                  <Text>Draggable</Text>
                </Draggable>
              )}
            </div>
          </Droppable>

          <Droppable id={"area-2"}>
            <div className="Area">
              Area 2
              {droppedOver === "area-2" && (
                <Draggable>
                  <Text>Draggable</Text>
                </Draggable>
              )}
            </div>
          </Droppable>
        </DndContext>
      </div>
    </>
  );
}

export default App;
