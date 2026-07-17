import { useMemo, useState } from 'react'
import { CalendarDays, Check, Crosshair, LoaderCircle, MapPin, Minus, Plus, ShieldCheck, ShoppingBag, UserRound, X } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = '528145560490'
const p = (line) => {
  const [name, detail, calories, protein, fiber, original, promo] = line.split('|')
  return { name, detail, calories: calories === '' ? null : +calories, protein: protein === '' ? null : +protein, fiber: fiber === '' ? null : +fiber, original: original === '' ? null : +original, promo: promo === '' ? null : +promo }
}
const plans = [
  ['personalizado', 'Personalizado', 'Cualquier producto y cantidad'],
  ['semanal', 'Semanal', 'Organiza tus pedidos de la semana'],
  ['quincenal', 'Quincenal', 'Mantén tu rutina por 2 semanas'],
  ['mensual', 'Mensual', 'Planea todo tu mes fit'],
]
const sections = [
  ['smoothies', 'Smoothies', 'Todos incluyen 1 scoop de proteína.', [
    p('Smoothie de Plátano Protein|Plátano, proteína y toque de canela|320|33|4|139|97.3'),
    p('Smoothie de Mango Protein|Mango tropical + proteína|340|33|3|199|139.3'),
    p('Smoothie de Fresa Protein|Fresa natural + proteína|310|33|4|209|146.3'),
    p('Smoothie de Arándano Protein|Arándanos + proteína|330|33|4|209|146.3'),
    p('Smoothie de Frutos Rojos Protein|Mix berries + proteína|330|33|5|229|160.3'),
    p('Smoothie Berry Mango Protein|Mango, fresa + proteína|340|33|4|205|143.5'),
    p('Smoothie Berry Happy Protein|Fresa, plátano, frutos rojos + proteína|335|33|4|199|139.3'),
    p('Smoothie Matcha Love Protein|Mango, plátano, matcha, espinaca + proteína|320|33|3|199|139.3'),
    p('Smoothie Cacao Protein|Plátano, cacao, dátiles + proteína|360|33|5|179|125.3'),
  ]],
  ['desayunos', 'Desayunos y huevos', 'Opciones prácticas, preparadas al momento.', [
    p('Hash Browns (2 piezas)|Crujientes en air fryer|240|2|2|39|27.3'),
    p('Hash Browns + Huevo Entero Revuelto|2 hash browns y huevo entero|440|15|2|99|69.3'),
    p('Hash Browns + Claras Revueltas|2 hash browns y claras|360|18|2|109|76.3'),
    p('2 Huevos Cocidos|Prácticos y altos en proteína|140|12|0|39|27.3'),
    p('Revuelto de Huevo Entero|Huevo revuelto tradicional|200|13|0|69|48.3'),
    p('Revuelto de Claras|Ligero y alto en proteína|110|16|0|79|55.3'),
    p('Huevo Entero + 5 Tortillas|Tortillas chicas de maíz o harina|360|17|4|109|76.3'),
    p('Claras + 5 Tortillas|Tortillas chicas de maíz o harina|290|20|4|99|69.3'),
  ]],
  ['air-fryer', 'Snacks air fryer', 'Snacks y combos preparados en air fryer.', [
    p('Papas a la Francesa (250 g)|Papas clásicas|420|5|4|79|55.3'),
    p('Crisscut Fries (250 g)|Papas crisscut|470|6|4|99|69.3'),
    p('Chicken Nuggets (12 piezas / 200 g)|Nuggets dorados|540|26|2|109|76.3'),
    p('Boneless (250 g)|Boneless crujientes en air fryer · valores aproximados|590|33|2|149|149'),
    p('Alitas de Pollo (6 piezas)|Alitas crujientes en air fryer · valores aproximados|470|37|0|79|79'),
    p('Alitas de Pollo (12 piezas)|Alitas crujientes en air fryer · valores aproximados|940|74|0|149|149'),
    p('Combo Papas + Chicken Nuggets|250 g de papas + 12 nuggets|960|31|6|179|125.3'),
    p('Combo Crisscut + Chicken Nuggets|250 g de crisscut + 12 nuggets|1010|32|6|189|132.3'),
    p('Mini Wontons de Pollo y Cilantro|12 piezas / 170-180 g|360|18|2|129|90.3'),
  ]],
  ['combos', 'Combos recomendados', 'Combinaciones listas para tu objetivo.', [
    p('Combo Pre-Workout|Café negro frío + creatina 5 g|25|0|0|79|55.3'),
    p('Combo Desayuno Fit|Hash browns, huevo + café caliente|445|15|2|149|104.3'),
    p('Combo Tortilla Power|Claras, tortillas + café caliente|295|20|4|139|97.3'),
    p('Combo Post-Workout|Smoothie plátano + 2 huevos cocidos|460|36|4|179|125.3'),
    p('Combo Snack Fit|Greek yogurt natural + smoothie plátano|440|36|4|179|125.3'),
    p('Combo Recovery Light|Electrolit + 2 huevos cocidos|185|12|0|89|62.3'),
    p('Combo Energy Break|Red Bull + yogurt con fruta|260|12|1|99|69.3'),
  ]],
  ['bebidas', 'Bebidas, café y yogurt', 'Hidratación, energía y opciones listas para llevar.', [
    p('Café Negro Caliente|Café negro 100%|5|0|0|45|31.5'),
    p('Café Negro Frío|Ideal para pre-workout|5|0|0|55|38.5'),
    p('Creatina en Agua (5 g)|Creatina monohidratada|20|0|0|39|27.3'),
    p('Coca-Cola Sin Azúcar (355 ml)|Lata|0|0|0|29|20.3'),
    p('Pepsi Black (355 ml)|Lata|0|0|0|25|17.5'),
    p('Electrolit (625 ml)|Hidratación con electrolitos|45|0|0|45|31.5'),
    p('Agua (600 ml)|Botella|0|0|0|20|14'),
    p('Red Bull (250 ml)|Energía y enfoque|110|0|0|59|41.3'),
    p('Monster Energy (473 ml)|Energía para tu día|210|0|0|65|45.5'),
    p('Yogurt Alpura con Fresa|Vaso de 125 g|120|5|0|49|34.3'),
    p('Yogurt Alpura con Manzana|Vaso de 125 g|130|5|0|59|41.3'),
    p('Yogurt Alpura con Durazno|Vaso de 125 g|140|5|0|62|43.4'),
    p('Yakult (65 ml)|Bebida probiótica||||19|19'),
    p('Agua de Coco Orgánica (330 ml)|Acapulcoco||||35|35'),
    p('Chobani Protein Shake - Frutos Rojos y Vainilla|296 ml · 20 g proteína||20||||'),
    p('Chobani Protein Shake - Fresas con Crema|296 ml · 20 g proteína||20||||'),
  ]],
]
const extras = [
  p('Scoop Extra de Proteína|Extra para smoothie|120|24|0|60|42'),
  p('Proteína Vegana|Sustituye proteína regular||||15|10.5'),
  p('Avena|Extra|70|2|2|25|17.5'), p('Crema de Cacahuate|Extra|95|4|1|35|24.5'),
  p('Chía|Extra|60|2|5|10|7'), p('Canela|Extra|6|0|2|5|3.5'),
  p('Extracto de Vainilla|Extra|12|0|0|8|5.6'), p('Matcha|Extra|10|1|1|20|14'),
  p('Creatina (5 g)|Booster|20|0|0|25|17.5'), p('Base Leche de Almendra|Base vegana|40|1|1|12|8.4'),
  p('Base Leche de Coco|Base vegana|45|0|0|12|8.4'),
]
const imageMap = {
  'Smoothie de Plátano Protein':'smoothie-banana','Smoothie de Mango Protein':'smoothie-mango','Smoothie de Fresa Protein':'smoothie-fresa','Smoothie de Arándano Protein':'smoothie-arandano','Smoothie de Frutos Rojos Protein':'smoothie-frutos-rojos','Smoothie Berry Mango Protein':'smoothie-berry-mango','Smoothie Berry Happy Protein':'smoothie-berry-happy','Smoothie Matcha Love Protein':'smoothie-matcha-love','Smoothie Cacao Protein':'smoothie-cacao',
  'Hash Browns (2 piezas)':'hash-browns','Hash Browns + Huevo Entero Revuelto':'hash-egg','Hash Browns + Claras Revueltas':'hash-whites','2 Huevos Cocidos':'boiled-eggs','Revuelto de Huevo Entero':'scrambled-egg','Revuelto de Claras':'scrambled-whites','Huevo Entero + 5 Tortillas':'egg-tortillas','Claras + 5 Tortillas':'whites-tortillas',
  'Papas a la Francesa (250 g)':'fries','Crisscut Fries (250 g)':'crisscut','Chicken Nuggets (12 piezas / 200 g)':'nuggets','Boneless (250 g)':'nuggets','Alitas de Pollo (6 piezas)':'nuggets','Alitas de Pollo (12 piezas)':'nuggets','Combo Papas + Chicken Nuggets':'combo-fries-nuggets','Combo Crisscut + Chicken Nuggets':'combo-crisscut-nuggets','Mini Wontons de Pollo y Cilantro':'wontons',
  'Combo Pre-Workout':'coffee-creatine','Combo Desayuno Fit':'hash-egg','Combo Tortilla Power':'whites-tortillas','Combo Post-Workout':'combo-post-workout','Combo Snack Fit':'combo-snack-fit','Combo Recovery Light':'combo-recovery','Combo Energy Break':'energy-red',
  'Café Negro Caliente':'coffee-hot','Café Negro Frío':'coffee-cold','Creatina en Agua (5 g)':'creatine-water','Coca-Cola Sin Azúcar (355 ml)':'energy-red','Pepsi Black (355 ml)':'energy-black','Electrolit (625 ml)':'combo-recovery','Agua (600 ml)':'water','Red Bull (250 ml)':'energy-red','Monster Energy (473 ml)':'energy-black','Yogurt Alpura con Fresa':'yogurt-strawberry','Yogurt Alpura con Manzana':'yogurt-apple','Yogurt Alpura con Durazno':'yogurt-peach','Yakult (65 ml)':'yakult','Agua de Coco Orgánica (330 ml)':'coconut-water','Chobani Protein Shake - Frutos Rojos y Vainilla':'yogurt-strawberry','Chobani Protein Shake - Fresas con Crema':'yogurt-strawberry',
  'Scoop Extra de Proteína':'extras-assortment','Proteína Vegana':'extras-assortment','Avena':'extras-assortment','Crema de Cacahuate':'extras-assortment','Chía':'extras-assortment','Canela':'extras-assortment','Extracto de Vainilla':'extras-assortment','Matcha':'extras-assortment','Creatina (5 g)':'creatine-water','Base Leche de Almendra':'coconut-water','Base Leche de Coco':'coconut-water',
}
const productImage = (name) => './assets/products/' + (imageMap[name] || 'extras-assortment') + '.png'
const money = (value) => Number.isFinite(value) ? '$' + value.toFixed(2) : 'Por confirmar'
const priceLabel = (value) => {
  const formatted = money(value)
  return formatted === 'Por confirmar' ? formatted : formatted + ' MXN'
}

function QuantityRow({ item, quantity, onChange }) {
  return <div className={'product-row ' + (quantity ? 'is-selected' : '')}>
    <button className="product-info" type="button" onClick={() => onChange(quantity ? -quantity : 1)}>
      <span className="select-dot">{quantity ? <Check size={14} /> : null}</span>
      <img className="product-thumb" src={productImage(item.name)} alt="" />
      <span className="product-copy"><strong>{item.name}</strong><small>{item.detail}</small>
        <span className="nutrition">{item.calories != null && <em>{item.calories} kcal</em>}{item.protein != null && <em>{item.protein} g proteína</em>}{item.fiber != null && <em>{item.fiber} g fibra</em>}</span>
      </span>
      <span className="price"><del>{item.original !== item.promo && item.original != null ? money(item.original) : ''}</del><strong>{money(item.promo)}</strong></span>
    </button>
    <div className="stepper"><button type="button" onClick={() => onChange(-1)} disabled={!quantity} aria-label={'Quitar ' + item.name}><Minus size={15} /></button>
      <input type="number" min="0" max="99" value={quantity || 0} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0) - quantity)} aria-label={'Cantidad de ' + item.name} />
      <button type="button" onClick={() => onChange(1)} aria-label={'Agregar ' + item.name}><Plus size={15} /></button></div>
  </div>
}

function App() {
  const [plan, setPlan] = useState('personalizado')
  const [quantities, setQuantities] = useState({})
  const [customer, setCustomer] = useState({ name: '', address: '', date: '', notes: '' })
  const [location, setLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')
  const [showSummary, setShowSummary] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const allItems = useMemo(() => [...sections.flatMap((section) => section[3]), ...extras], [])
  const selectedItems = useMemo(() => allItems.filter((item) => (quantities[item.name] || 0) > 0), [allItems, quantities])
  const totals = useMemo(() => selectedItems.reduce((sum, item) => {
    const qty = quantities[item.name]
    return { items: sum.items + qty, price: sum.price + (item.promo || 0) * qty, calories: sum.calories + (item.calories || 0) * qty, protein: sum.protein + (item.protein || 0) * qty, fiber: sum.fiber + (item.fiber || 0) * qty, quote: sum.quote || item.promo == null }
  }, { items: 0, price: 0, calories: 0, protein: 0, fiber: 0, quote: false }), [selectedItems, quantities])
  const missing = [!totals.items && 'productos', !customer.name.trim() && 'nombre', !customer.address.trim() && 'dirección', !customer.date && 'fecha'].filter(Boolean)
  const changeQuantity = (name, delta) => setQuantities((current) => ({ ...current, [name]: Math.max(0, Math.min(99, (current[name] || 0) + delta)) }))

  function requestLocation() {
    if (!navigator.geolocation) return setLocationStatus('unsupported')
    setLocationStatus('loading')
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocation({ lat: coords.latitude, lng: coords.longitude }); setLocationStatus('success')
    }, () => setLocationStatus('error'), { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 })
  }
  function buildMessage() {
    const chosenPlan = plans.find(([id]) => id === plan)?.[1]
    const orderLines = selectedItems.map((item) => {
      const qty = quantities[item.name]
      return '• ' + qty + ' × ' + item.name + ' — ' + (item.promo == null ? 'precio por confirmar' : money(item.promo * qty))
    })
    const mapLink = location ? 'https://maps.google.com/?q=' + location.lat + ',' + location.lng : 'No compartida'
    return ['Hola Protein Fit MTY, quiero hacer este pedido:', '', '*Tipo de plan:* ' + chosenPlan, ...orderLines, '',
      '*Total promo estimado:* ' + money(totals.price) + ' MXN' + (totals.quote ? ' + productos por confirmar' : ''),
      '*Nutrición estimada:* ' + totals.calories + ' kcal · ' + totals.protein + ' g proteína · ' + totals.fiber + ' g fibra', '',
      '*Nombre:* ' + customer.name, '*Dirección:* ' + customer.address, '*Fecha solicitada:* ' + customer.date,
      '*Ubicación GPS:* ' + mapLink, '*Notas:* ' + (customer.notes || 'Sin notas'), '',
      '¿Me ayudan a confirmar disponibilidad, horario y total final?'].join('\n')
  }
  function sendOrder() {
    setAttempted(true)
    if (missing.length) {
      document.querySelector(!totals.items ? '#smoothies' : '#datos-entrega')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return
    }
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  return <div className="site-shell">
    <header className="topbar"><a className="brand" href="#crear-plan"><img src="./assets/protein-fit-logo.jpeg" alt="Protein Fit MTY" /><span><strong>Protein Fit MTY</strong><small>Fuerza, energía y proteína real</small></span></a><span className="header-service"><MapPin size={16} /> Envío gratis dentro de 5 km</span></header>
    <main className="builder-page" id="crear-plan">
      <div className="builder-intro"><span>Pedido personalizado</span><h1>Construye tu plan fit</h1><p>Agrega cualquier producto, combina las cantidades que quieras y envía tu pedido completo por WhatsApp.</p><div className="promo-note"><strong>30% OFF</strong><span>Los precios promocionales ya están aplicados.</span></div></div>
      <div className="builder-content">
        <section className="plan-picker"><div className="section-title"><span>1</span><div><h2>¿Cómo quieres organizarlo?</h2><p>Personalizado está seleccionado por defecto.</p></div></div>
          <div className="plan-options">{plans.map(([id, name, description]) => <button key={id} type="button" className={plan === id ? 'is-selected' : ''} onClick={() => setPlan(id)}><span className="select-dot">{plan === id ? <Check size={14} /> : null}</span><strong>{name}</strong><small>{description}</small></button>)}</div>
        </section>
        <div className="section-title products-title"><span>2</span><div><h2>Elige productos y cantidades</h2><p>La nutrición corresponde a una unidad. El total se actualiza automáticamente.</p></div></div>
        {sections.map(([id, title, note, items]) => <section className="product-section" id={id} key={id}><div className="product-section-heading"><div><h3>{title}</h3><p>{note}</p></div><span>{items.length} opciones</span></div><div className="product-grid">{items.map((item) => <QuantityRow key={item.name} item={item} quantity={quantities[item.name] || 0} onChange={(delta) => changeQuantity(item.name, delta)} />)}</div></section>)}
        <section className="product-section extras-section" id="extras"><div className="product-section-heading"><div><h3>Extras y boosters</h3><p>Cada extra tiene su propia cantidad y se suma correctamente.</p></div><span>{extras.length} opciones</span></div><div className="product-grid">{extras.map((item) => <QuantityRow key={item.name} item={item} quantity={quantities[item.name] || 0} onChange={(delta) => changeQuantity(item.name, delta)} />)}</div></section>
        <section className="delivery-section" id="datos-entrega"><div className="section-title"><span>3</span><div><h2>Datos para tu pedido</h2><p>Nombre, dirección y fecha son obligatorios.</p></div></div>
          <div className="form-grid">
            <label className={attempted && !customer.name.trim() ? 'has-error' : ''}><span><UserRound size={16} /> Nombre *</span><input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Tu nombre completo" /></label>
            <label className={attempted && !customer.date ? 'has-error' : ''}><span><CalendarDays size={16} /> Fecha de entrega o pickup *</span><input required type="date" value={customer.date} onChange={(e) => setCustomer({ ...customer, date: e.target.value })} /></label>
            <label className={'full-width ' + (attempted && !customer.address.trim() ? 'has-error' : '')}><span><MapPin size={16} /> Dirección completa *</span><input required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="Calle, número, colonia, municipio y referencias" /></label>
            <div className="location-field full-width"><div><strong>Ubicación GPS</strong><small>Opcional. Se envía como enlace de Google Maps.</small></div><button type="button" onClick={requestLocation} disabled={locationStatus === 'loading'}>{locationStatus === 'loading' ? <LoaderCircle className="spin" /> : locationStatus === 'success' ? <Check /> : <Crosshair />}{locationStatus === 'loading' ? 'Obteniendo...' : locationStatus === 'success' ? 'Ubicación agregada' : 'Usar mi ubicación'}</button>{['error', 'unsupported'].includes(locationStatus) && <p>No fue posible obtener tu ubicación. Puedes continuar con la dirección escrita.</p>}</div>
            <label className="full-width"><span>Notas o indicaciones</span><textarea rows="3" value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} placeholder="Alergias, horario preferido o indicaciones especiales" /></label>
          </div>
        </section>
      </div>
    </main>
    <footer><div className="footer-brand"><img src="./assets/protein-fit-logo.jpeg" alt="" /><div><strong>Protein Fit MTY</strong><span>Pickup disponible · DiDi Food · Rappi</span></div></div><div className="footer-contact"><div><span><MapPin /> Calle Tomás Treviño 216, CP 66413, San Nicolás de los Garza, N.L.</span><a className="instagram-profile" href="https://instagram.com/protein_fit_mty" target="_blank" rel="noreferrer"><FaInstagram /> @protein_fit_mty</a></div></div><span className="footer-secure"><ShieldCheck /> El total y disponibilidad se confirman por WhatsApp.</span></footer>
    <div className="floating-checkout"><div className="checkout-total"><small>{totals.items} {totals.items === 1 ? 'artículo' : 'artículos'}</small><strong>{money(totals.price)} MXN</strong>{totals.quote && <em>+ por confirmar</em>}</div><div className="checkout-nutrition"><span>{totals.calories} kcal</span><span>{totals.protein} g proteína</span></div><button className="review-button" type="button" onClick={() => setShowSummary(true)} disabled={!totals.items}><ShoppingBag /> Revisar</button><button className="whatsapp-button" type="button" onClick={sendOrder}><FaWhatsapp /> Ordenar por WhatsApp</button>{attempted && missing.length > 0 && <p className="floating-error">Falta: {missing.join(', ')}.</p>}</div>
    {showSummary && <div className="summary-backdrop" onMouseDown={() => setShowSummary(false)}><aside className="summary-drawer" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}><div className="drawer-heading"><div><small>Tu pedido</small><h2>{totals.items} artículos</h2></div><button type="button" onClick={() => setShowSummary(false)} aria-label="Cerrar resumen"><X /></button></div><div className="drawer-items">{selectedItems.map((item) => <div key={item.name}><span><strong>{quantities[item.name]} × {item.name}</strong><small>{item.calories ?? 0} kcal · {item.protein ?? 0} g proteína c/u</small></span><b>{item.promo == null ? 'Por confirmar' : money(item.promo * quantities[item.name])}</b></div>)}</div><div className="drawer-totals"><span><small>Total promo estimado</small><strong>{money(totals.price)} MXN</strong></span><span><small>Nutrición estimada</small><strong>{totals.calories} kcal · {totals.protein} g proteína</strong></span></div><button className="whatsapp-button" type="button" onClick={sendOrder}><FaWhatsapp /> Ordenar por WhatsApp</button></aside></div>}
  </div>
}
export default App
