import { useState, useCallback } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const [todos, setTodos] = useState(() => [
    { id: 1, text: '프로젝트 기획서 작성하기', completed: false },
    { id: 2, text: '회의 준비하기', completed: true },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos(prev => [newTodo, ...prev]);
    setInputValue('');
  }, [inputValue]);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const activeTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            할 일 관리
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            오늘 해야 할 일들을 체크해보세요
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-in fade-in slide-in-from-top duration-700 delay-100">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">진행 중</p>
            <p className="text-3xl font-bold text-blue-500">{activeTodos}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100">
            <p className="text-sm text-gray-600 mb-1">완료</p>
            <p className="text-3xl font-bold text-purple-500">{completedTodos}</p>
          </div>
        </div>

        {/* Add Todo Form */}
        <form 
          onSubmit={addTodo}
          className="mb-6 animate-in fade-in slide-in-from-top duration-700 delay-200"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="새로운 할 일을 입력하세요..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              추가
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-gray-500">아직 할 일이 없습니다</p>
              <p className="text-sm text-gray-400 mt-1">위에서 새로운 할 일을 추가해보세요!</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-200 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0",
                      todo.completed
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500"
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                    )}
                  >
                    {todo.completed && (
                      <Check className="w-4 h-4 text-white animate-in zoom-in duration-200" />
                    )}
                  </button>

                  <span
                    className={cn(
                      "flex-1 transition-all duration-200",
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    )}
                  >
                    {todo.text}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500 animate-in fade-in duration-700 delay-300">
            총 <span className="font-semibold text-purple-600">{todos.length}</span>개의 할 일
          </div>
        )}
      </div>
    </div>
  );
}

export default App;