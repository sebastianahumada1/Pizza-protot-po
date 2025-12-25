
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { SIDES } from '../constants';
import Layout from '../components/Layout';

const SummaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, subtotal, deliveryFee, addToCart, updateQuantity, notes, setNotes, paymentMethod, setPaymentMethod } = useCart();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-white dark:bg-background-dark">
          <div className="size-24 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl text-gray-300">shopping_basket</span>
          </div>
          <h2 className="text-2xl font-black mb-2">Tu bolsa está vacía</h2>
          <p className="text-gray-500 mb-8 max-w-[240px]">Parece que aún no has añadido ninguna delicia a tu pedido.</p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            Explorar Menú
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="pb-36 bg-gray-50 dark:bg-background-dark">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center px-4 py-4 justify-between">
          <button onClick={() => navigate('/')} className="flex size-11 items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group">
            <span className="material-symbols-outlined text-2xl group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-black tracking-tight uppercase">Resumen</h2>
            <span className="text-[10px] font-bold text-gray-400">{cart.length} productos seleccionados</span>
          </div>
          <div className="size-11"></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-8 p-5 w-full">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black">Tu Selección</h3>
          </div>
          <div className="flex flex-col gap-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white dark:bg-surface-dark rounded-[2rem] p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 group animate-fade-in-up">
                <div className="size-20 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-20 py-0.5">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-base leading-tight line-clamp-1">{item.name}</h4>
                    <span className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs font-medium">${item.price.toFixed(2)} / ud</p>
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="size-7 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark shadow-sm text-primary hover:bg-primary hover:text-white transition-all font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="size-7 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark shadow-sm text-primary hover:bg-primary hover:text-white transition-all font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black mb-4">Acompaña tu pedido</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 no-scrollbar">
            {SIDES.map(side => (
              <div key={side.id} className="shrink-0 w-44 flex flex-col bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="w-full aspect-square rounded-2xl overflow-hidden relative mb-3">
                  <img src={side.image} className="w-full h-full object-cover" alt={side.name} />
                  <button 
                    onClick={() => addToCart(side)}
                    className="absolute bottom-2 right-2 size-9 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg active:scale-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-xl font-bold">add</span>
                  </button>
                </div>
                <p className="font-bold text-sm truncate">{side.name}</p>
                <p className="text-primary font-black text-base mt-0.5">${side.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black">Detalles de Entrega</h3>
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">notes</span>
                Notas Especiales
              </label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl text-sm p-4 focus:ring-2 focus:ring-primary/20 placeholder:text-gray-300 resize-none transition-all" 
                placeholder="Ej: Sin cebolla, dejar en conserjería..." 
                rows={3}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">wallet</span>
                Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
                >
                  <span className="material-symbols-outlined text-2xl">payments</span>
                  <span className="text-[10px] font-black text-center leading-tight">EFECTIVO</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
                >
                  <span className="material-symbols-outlined text-2xl">credit_card</span>
                  <span className="text-[10px] font-black text-center leading-tight">TARJETA</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('binance')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'binance' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
                >
                  <span className="material-symbols-outlined text-2xl">currency_bitcoin</span>
                  <span className="text-[10px] font-black text-center leading-tight">BINANCE</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('pago_movil')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'pago_movil' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
                >
                  <span className="material-symbols-outlined text-2xl">phone_android</span>
                  <span className="text-[10px] font-black text-center leading-tight">PAGO MÓVIL</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'transferencia' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
                >
                  <span className="material-symbols-outlined text-2xl">account_balance</span>
                  <span className="text-[10px] font-black text-center leading-tight">TRANSFERENCIA</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('zelle')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${paymentMethod === 'zelle' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
                >
                  <span className="material-symbols-outlined text-2xl">send_money</span>
                  <span className="text-[10px] font-black text-center leading-tight">ZELLE</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/20 mb-10">
          <div className="space-y-4">
            <div className="flex justify-between items-center opacity-60">
              <span className="font-bold text-sm">Subtotal</span>
              <span className="font-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center opacity-60">
              <span className="font-bold text-sm">Costo de Envío</span>
              <span className="font-black">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/10 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-black text-xl">Total Final</span>
              <span className="font-black text-3xl text-primary drop-shadow-sm">${total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-background-dark/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-5 safe-area-pb z-40">
        <div className="max-w-md mx-auto w-full">
          <button 
            onClick={() => navigate('/confirm')} 
            className="w-full bg-primary hover:bg-red-600 active:scale-95 text-white font-black h-16 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30"
          >
            <span>Confirmar Pedido</span>
            <span className="material-symbols-outlined font-bold">check_circle</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SummaryScreen;
