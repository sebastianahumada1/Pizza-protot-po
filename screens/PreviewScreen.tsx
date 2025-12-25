
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import Layout from '../components/Layout';

const PreviewScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, address, notes, paymentMethod } = useCart();

  const getPaymentMethodName = (method: string): string => {
    const paymentNames: Record<string, string> = {
      'cash': 'Efectivo',
      'card': 'Tarjeta (Contra entrega)',
      'binance': 'Binance',
      'pago_movil': 'Pago Móvil',
      'transferencia': 'Transferencia Bancaria',
      'zelle': 'Zelle'
    };
    return paymentNames[method] || method;
  };

  const generateOrderNumber = (): string => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PED-${dateStr}-${random}`;
  };

  const [orderNumber] = useState(() => generateOrderNumber());

  const handleSend = () => {
    const itemsText = cart.map(item => `• ${item.quantity}x ${item.name}`).join('\n');
    const message = `*¡Hola!* 👋 Quisiera realizar un pedido:\n\n` +
      `*🆔 NÚMERO DE PEDIDO:* ${orderNumber}\n\n` +
      `*🛒 PRODUCTOS:*\n${itemsText}\n\n` +
      `*📍 DIRECCIÓN:* ${address}\n` +
      (notes ? `*📝 NOTA:* ${notes}\n` : '') +
      `*💵 PAGO:* ${getPaymentMethodName(paymentMethod)}\n\n` +
      `*💰 TOTAL:* $${total.toFixed(2)}\n\n` +
      `_¿Podrían confirmarme el tiempo estimado? Gracias!_`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Layout className="bg-[#e5ddd5] dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-[#075e54] text-white p-4 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/confirm')} className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/20 overflow-hidden">
              <img src="https://picsum.photos/100/100?pizza" className="w-full h-full object-cover" alt="Restaurant" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-base leading-none">Pizzas Express</h2>
              <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online ahora</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-8 relative space-y-6">
        <div className="flex justify-center sticky top-2 z-10">
          <span className="bg-[#dcf8c6] dark:bg-surface-dark text-slate-600 dark:text-gray-300 text-[11px] font-bold px-4 py-1.5 rounded-xl shadow-sm uppercase tracking-tighter">
            Hoy
          </span>
        </div>

        <div className="flex flex-col items-end gap-1 animate-fade-in-up">
          <div className="relative bg-[#dcf8c6] dark:bg-whatsapp/20 shadow-sm rounded-2xl rounded-tr-sm p-4 text-slate-800 dark:text-white max-w-[85%] border-b border-black/5">
            <div className="text-[14px] leading-relaxed font-medium whitespace-pre-wrap">
              <span className="font-bold">¡Hola!</span> 👋 Quisiera realizar un pedido:<br/><br/>
              <span className="font-bold text-[11px] text-green-700 dark:text-whatsapp uppercase tracking-wider">🆔 NÚMERO DE PEDIDO:</span><br/>
              <span className="pl-2 font-black">{orderNumber}</span><br/><br/>
              <span className="font-bold text-[11px] text-green-700 dark:text-whatsapp uppercase tracking-wider">🛒 PRODUCTOS:</span><br/>
              {cart.map(item => (
                <div key={item.id} className="pl-2">
                  • {item.quantity}x {item.name}
                </div>
              ))}
              <br/>
              <span className="font-bold text-[11px] text-green-700 dark:text-whatsapp uppercase tracking-wider">📍 DIRECCIÓN:</span><br/>
              <span className="pl-2">{address}</span><br/><br/>
              
              {notes && (
                <>
                  <span className="font-bold text-[11px] text-green-700 dark:text-whatsapp uppercase tracking-wider">📝 NOTA:</span><br/>
                  <span className="pl-2 italic">"{notes}"</span><br/><br/>
                </>
              )}
              
              <span className="font-bold text-[11px] text-green-700 dark:text-whatsapp uppercase tracking-wider">💵 PAGO:</span><br/>
              <span className="pl-2">{getPaymentMethodName(paymentMethod)}</span><br/><br/>
              
              <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5">
                <span className="font-black text-lg">💰 TOTAL: ${total.toFixed(2)}</span>
              </div>
              
              <div className="mt-4 italic opacity-80 text-xs">
                ¿Podrían confirmarme el tiempo estimado? Gracias!
              </div>
            </div>
            <div className="flex justify-end items-center gap-1 mt-2 opacity-40">
              <span className="text-[9px] font-bold">{currentTime}</span>
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
            </div>
            
            {/* WhatsApp bubble tail */}
            <div className="absolute top-0 -right-2 w-3 h-3 bg-[#dcf8c6] dark:bg-whatsapp/20" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}></div>
          </div>
        </div>
      </div>

      <footer className="p-6 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-lg font-black text-slate-900 dark:text-white">¿Todo correcto?</h4>
            <p className="text-sm text-gray-500 font-medium">Pulsa el botón para abrir el chat oficial.</p>
          </div>
          
          <button 
            onClick={handleSend} 
            className="group relative flex w-full items-center justify-center gap-4 h-16 bg-whatsapp hover:bg-[#1abe5c] text-white rounded-2xl shadow-xl shadow-whatsapp/30 active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            <span className="text-lg font-black uppercase tracking-tight">Enviar por WhatsApp</span>
          </button>
          
          <button 
            onClick={() => navigate('/summary')}
            className="w-full py-3 px-4 bg-red-600 dark:bg-red-500 text-white text-sm font-bold rounded-2xl hover:bg-red-700 dark:hover:bg-red-600 active:scale-95 transition-all shadow-md shadow-red-500/20"
          >
            Atrás, quiero cambiar algo
          </button>
        </div>
      </footer>
    </Layout>
  );
};

export default PreviewScreen;
