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
import { Settings, SquarePlus } from "lucide-react";
import { Modal } from "./components/Modal/Modal";
import { Icon } from "./components/Icon/Icon";

import { DndContext } from "@dnd-kit/core";

import { Draggable } from "./components/Draggable/Draggable";
import { Droppable } from "./components/Droppable/Droppable";

const sortOptions = [
  { label: "Date Ascending", value: "date-ascending" },
  { label: "Date Descending", value: "date-descending" },
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

const columns = [
  { handle: "backlog", title: "Backlog" },
  { handle: "in-progress", title: "In Progress" },
  { handle: "done", title: "Done" },
];

function App() {
  const [toDos, setToDos] = useState(
    validateToDosData(JSON.parse(localStorage.getItem("to-dos"))) || []
  );

  const [selectedSortOption, setSelectedSortOption] = useState(
    localStorage.getItem("selected-sort-option") || "date-ascending"
  );

  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(localStorage.getItem("selected-filters")) || []
  );

  useEffect(() => {
    localStorage.setItem("selected-sort-option", selectedSortOption);
  }, [selectedSortOption]);

  useEffect(() => {
    localStorage.setItem("to-dos", JSON.stringify(toDos));
  }, [toDos]);

  useEffect(() => {
    localStorage.setItem("selected-filters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  function addToDo(column = "backlog") {
    setToDos((prev) => [
      ...prev.map((toDo) => ({ ...toDo, isInEditMode: false })),
      {
        isDone: false,
        text: `New To Do`,
        isInEditMode: true,
        createdAt: new Date(),
        priority: "medium",
        column: column,
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

  function handleExportToDos() {
    const dataStr = JSON.stringify(toDos, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "export.todos";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleImportToDos(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        setToDos(validateToDosData(imported));
      } catch (err) {
        alert("Invalid file");
      }
    };

    reader.readAsText(file);
  }

  function validateToDosData(toDos) {
    return toDos.map((toDo) => {
      return {
        isDone: typeof toDo.isDone === "boolean" ? toDo.isDone : false,
        text:
          toDo.text && typeof toDo.text === "string"
            ? toDo.text
            : "Missing Text",
        isInEditMode: false,
        createdAt:
          toDo.createdAt && typeof toDo.createdAt === "string"
            ? toDo.createdAt
            : JSON.stringify(new Date()),
        priority:
          toDo.priority && typeof toDo.priority === "string"
            ? toDo.priority
            : "medium",
        column:
          toDo.column && typeof toDo.column === "string"
            ? toDo.column
            : "backlog",
      };
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
          <DndContext autoScroll={false} onDragEnd={handleToDoDragEnd}>
            {columns.map((column, index) => (
              <div key={index} className="Column">
                <div className="Column__Header">
                  <Text as="h3" variant="heading-small">
                    {column.title}
                  </Text>
                </div>

                <Droppable id={column.handle}>
                  <div className="Column__Area">
                    {toDos
                      .filter((toDo) => toDo.column === column.handle)
                      .filter(
                        (toDo) =>
                          selectedFilters.length === 0 ||
                          selectedFilters.includes(toDo.priority)
                      )
                      .sort(sortFunction)
                      .map((toDo) => (
                        <Draggable key={toDo.createdAt} id={toDo.createdAt}>
                          {({
                            setNodeRef,
                            listeners,
                            attributes,
                            transformStyle,
                          }) => (
                            <li>
                              <ToDo
                                ref={setNodeRef}
                                dragListeners={listeners}
                                dragAttributes={attributes}
                                style={transformStyle}
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
                                  saveToDo(
                                    toDo.createdAt,
                                    newText,
                                    priority,
                                    true
                                  )
                                }
                                handleEditClick={() => {
                                  editToDo(toDo.createdAt);
                                }}
                                handlePriorityChange={(newText, priority) =>
                                  saveToDo(toDo.createdAt, newText, priority)
                                }
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}

                    <div className="Column__Actions">
                      <Button
                        icon={<Icon lucideIcon={<SquarePlus />} />}
                        onClick={() => addToDo(column.handle)}
                      />
                    </div>
                  </div>
                </Droppable>
              </div>
            ))}
          </DndContext>
        </ToDoList>

        <Button onClick={() => addToDo()}>Add To Do</Button>

        <div className="Settings">
          <Modal triggerIcon={<Icon lucideIcon={<Settings />} />}>
            <input
              id="import-todos-input"
              className="u-Hidden"
              type="file"
              accept=".todos"
              onChange={handleImportToDos}
            />
            <Button
              onClick={() =>
                document.querySelector("#import-todos-input").click()
              }
            >
              Import To Do`s
            </Button>
            <Button onClick={handleExportToDos}>Export To Do`s</Button>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
