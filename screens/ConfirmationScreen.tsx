
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { HERO_IMAGE } from '../constants';
import Layout from '../components/Layout';

const ConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, subtotal, deliveryFee, address, deliveryMethod, setDeliveryMethod } = useCart();

  return (
    <Layout>
      <div className="flex items-center px-4 py-3 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
        <button onClick={() => navigate('/summary')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[#1b0e0e] dark:text-white" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-[#1b0e0e] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Confirmar Pedido</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-40 no-scrollbar">
        <div className="px-4 pt-2 pb-6">
          <div className="w-full aspect-[2/1] rounded-xl overflow-hidden shadow-sm relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <div 
              className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-700" 
              style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
            />
            <div className="absolute bottom-3 left-4 z-20">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-primary text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>local_pizza</span>
                Recién horneada
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 text-center">
          <h2 className="text-[#1b0e0e] dark:text-white tracking-tight text-3xl font-extrabold leading-tight mb-2">¡Todo listo!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">Revisa tu pedido antes de enviarlo a WhatsApp.</p>
        </div>

        <div className="mt-8 mx-4 bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
            Método de Entrega
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setDeliveryMethod('delivery')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${deliveryMethod === 'delivery' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
            >
              <span className="material-symbols-outlined text-3xl">delivery_dining</span>
              <span className="text-xs font-black">DELIVERY</span>
            </button>
            <button 
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${deliveryMethod === 'pickup' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 grayscale opacity-60'}`}
            >
              <span className="material-symbols-outlined text-3xl">store</span>
              <span className="text-xs font-black">RETIRAR</span>
            </button>
          </div>
        </div>

        <div className="mt-6 mx-4 bg-surface-light dark:bg-surface-dark rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 px-3 py-3 justify-between border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center justify-center rounded-full bg-primary/10 shrink-0 size-10">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>schedule</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Tiempo estimado</p>
                <p className="text-[#1b0e0e] dark:text-white text-base font-bold leading-normal">30-45 min</p>
              </div>
            </div>
            <div className="shrink-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-bold">
              A tiempo
            </div>
          </div>
          {deliveryMethod === 'delivery' && (
            <div className="flex items-center gap-4 px-3 py-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-full bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>location_on</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Entregar en</p>
                  <p className="text-[#1b0e0e] dark:text-white text-base font-bold leading-normal line-clamp-1">{address}</p>
                </div>
              </div>
              <button className="text-primary text-sm font-semibold">Editar</button>
            </div>
          )}
          {deliveryMethod === 'pickup' && (
            <div className="flex items-center gap-4 px-3 py-3 justify-between">
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-full bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>store</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Retirar en</p>
                  <p className="text-[#1b0e0e] dark:text-white text-base font-bold leading-normal">Tienda</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 mx-4">
          <h3 className="text-lg font-bold text-[#1b0e0e] dark:text-white mb-3 pl-1">Tu Pedido</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
            {cart.map((item, idx) => (
              <div key={item.id} className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 text-[#1b0e0e] dark:text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{item.quantity}</div>
                  <div>
                    <p className="text-[#1b0e0e] dark:text-white text-base font-semibold leading-tight">{item.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 line-clamp-1">{item.description}</p>
                  </div>
                </div>
                <p className="text-[#1b0e0e] dark:text-white text-base font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <div className="h-px bg-gray-100 dark:bg-gray-700 my-2"></div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="text-[#1b0e0e] dark:text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {deliveryMethod === 'delivery' && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Envío</span>
                  <span className="text-[#1b0e0e] dark:text-white font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 mt-2">
                <span className="text-[#1b0e0e] dark:text-white text-lg font-bold">Total</span>
                <span className="text-primary text-2xl font-extrabold tracking-tight">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-transparent z-50 max-w-md mx-auto">
        <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <button 
          onClick={() => navigate('/preview')} 
          className="w-full bg-whatsapp hover:bg-[#1abe5c] text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-whatsapp/30 transform active:scale-[0.98] transition-all duration-200"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>chat</span>
          <span className="text-lg font-bold">Continuar a WhatsApp</span>
        </button>
        <button 
          onClick={() => navigate('/summary')} 
          className="w-full mt-3 py-3 px-4 bg-red-600 dark:bg-red-500 text-white text-sm font-bold rounded-full hover:bg-red-700 dark:hover:bg-red-600 active:scale-95 transition-all shadow-md shadow-red-500/20"
        >
          Cancelar o Editar Pedido
        </button>
        <div className="h-5"></div>
      </div>
    </Layout>
  );
};

export default ConfirmationScreen;
