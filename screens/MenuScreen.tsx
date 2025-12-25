
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PIZZAS, CATEGORIES } from '../constants';
import { useCart } from '../CartContext';
import Layout from '../components/Layout';

const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, total, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPizzas = useMemo(() => {
    return PIZZAS.filter(p => {
      const matchesCategory = activeCategory === 'Todas' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getItemQuantity = (id: string) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <Layout className="pb-[120px]">
      <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl px-5 py-4 flex flex-col gap-4 border-b border-gray-100 dark:border-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Premium Pizza</span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Pizzas Express</h1>
          </div>
          <button 
            onClick={() => total > 0 && navigate('/summary')}
            className="relative p-2.5 rounded-full bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:scale-110 active:scale-95 group"
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '26px' }}>shopping_bag</span>
            {total > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-background-light dark:ring-background-dark animate-pulse">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text"
            placeholder="¿Qué te apetece hoy?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-white/5 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </header>

      <main className="flex flex-col w-full p-5 gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Categorías</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl px-6 transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-slate-600 dark:text-gray-400 hover:border-primary/50'
                }`}
              >
                <span className="text-sm font-bold">{cat}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Menú Principal</h3>
            <span className="text-xs font-bold text-gray-400 uppercase">{filteredPizzas.length} items</span>
          </div>
          
          <div className="grid gap-5">
            {filteredPizzas.map(pizza => {
              const qty = getItemQuantity(pizza.id);
              return (
                <div key={pizza.id} className="group relative flex p-3 gap-4 bg-white dark:bg-surface-dark rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="relative w-32 h-32 shrink-0 rounded-[1.5rem] overflow-hidden bg-gray-200 shadow-inner">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                      style={{ backgroundImage: `url("${pizza.image}")` }}
                    />
                    {pizza.popular && (
                      <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm">
                        TOP VENTAS
                      </div>
                    )}
                    {qty > 0 && (
                      <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-primary text-white text-xl font-black h-10 w-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-surface-dark">
                          {qty}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 justify-between py-2 pr-2">
                    <div>
                      <h4 className="text-slate-900 dark:text-white text-lg font-black leading-tight group-hover:text-primary transition-colors">{pizza.name}</h4>
                      <p className="mt-1.5 text-gray-500 dark:text-gray-400 text-[11px] font-medium leading-relaxed line-clamp-2">{pizza.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Precio</span>
                        <span className="text-slate-900 dark:text-white text-lg font-black">${pizza.price.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(pizza);
                        }}
                        className="h-11 w-11 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-2xl font-bold">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredPizzas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <p className="font-bold">No encontramos esa pizza...</p>
              <p className="text-sm">Intenta con otra búsqueda</p>
            </div>
          )}
        </section>
      </main>
      
      {total > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-5 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button 
              onClick={() => navigate('/summary')} 
              className="w-full flex items-center justify-between bg-primary hover:bg-red-600 text-white rounded-[2rem] p-1.5 pl-7 pr-3 h-[72px] shadow-2xl shadow-primary/40 transform transition-all active:scale-95 group overflow-hidden"
            >
              <div className="flex flex-col items-start relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Total del Pedido</span>
                <span className="text-xl font-black">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 rounded-full py-2 px-6 h-14 backdrop-blur-md border border-white/20 group-hover:bg-white/30 transition-all">
                <span className="text-sm font-black uppercase tracking-tighter">Pagar Ahora</span>
                <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MenuScreen;
