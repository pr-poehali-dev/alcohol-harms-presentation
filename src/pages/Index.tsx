import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/80f03b47-f833-4671-9abe-fdb1ff32b113/files/c6cc3b25-d07b-4bb0-abbc-220e61b0d9d9.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{value.toLocaleString("ru-RU")}{suffix}</span>;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const navItems = [
  { id: "intro", label: "Введение" },
  { id: "stats", label: "Статистика" },
  { id: "health", label: "Здоровье" },
  { id: "prevention", label: "Профилактика" },
  { id: "conclusion", label: "Выводы" },
];

export default function Index() {
  const [active, setActive] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) { setActive(navItems[i].id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#e8e0d5] font-golos">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0f14]/90 backdrop-blur-md border-b border-[#2a1f1f]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="font-cormorant text-[#c8332a] text-xl font-semibold italic">Алкоголь & здоровье</span>
          <div className="hidden md:flex gap-1">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  active === n.id
                    ? "bg-[#c8332a]/20 text-[#e05a50]"
                    : "text-[#9a8f8a] hover:text-[#e8e0d5]"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-[#9a8f8a]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#13161d] border-t border-[#2a1f1f] px-4 py-3 flex flex-col gap-2">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left py-2 text-[#e8e0d5] text-sm">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — ВВЕДЕНИЕ */}
      <section id="intro" className="relative min-h-screen flex items-center overflow-hidden pt-14">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 bg-[#c8332a]/15 border border-[#c8332a]/30 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#e05a50] animate-pulse" />
              <span className="text-[#e05a50] text-sm font-medium tracking-wide">Важная информация</span>
            </div>
          </div>
          <h1 className="font-cormorant text-5xl md:text-7xl font-semibold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Алкоголь —<br />
            <span className="text-[#c8332a] italic">скрытая угроза</span><br />
            вашему здоровью
          </h1>
          <p className="text-[#9a8f8a] text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Ежегодно от последствий употребления алкоголя в мире погибает более <strong className="text-[#e8e0d5]">3 миллионов человек</strong>. 
            Это больше, чем от СПИДа, туберкулёза и малярии вместе взятых.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <button
              onClick={() => scrollTo("stats")}
              className="inline-flex items-center gap-2 bg-[#c8332a] hover:bg-[#a8251e] text-white px-7 py-3 rounded-lg font-medium transition-all hover:scale-105"
            >
              Узнать факты <Icon name="ArrowDown" size={18} />
            </button>
            <button
              onClick={() => scrollTo("prevention")}
              className="inline-flex items-center gap-2 border border-[#3a2f2f] hover:border-[#c8332a]/50 text-[#9a8f8a] hover:text-[#e8e0d5] px-7 py-3 rounded-lg font-medium transition-all"
            >
              Методы защиты <Icon name="Shield" size={18} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4a3f3f] animate-fade-in" style={{ animationDelay: "1s" }}>
          <span className="text-xs tracking-widest uppercase">Листайте вниз</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>

      {/* СТАТИСТИКА */}
      <section id="stats" className="py-24 bg-[#10121a]">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-3 block">Цифры и факты</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Статистика, которая<br /><em>не оставляет равнодушным</em></h2>
              <p className="text-[#6a5f5f] max-w-xl mx-auto">Данные Всемирной организации здравоохранения и Росстата</p>
            </div>
          </Section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: 3000000, suffix: "+", label: "смертей в год", sublabel: "в мире от алкоголя", icon: "Skull" },
              { value: 5, suffix: "%", label: "всех смертей", sublabel: "связаны с алкоголем", icon: "TrendingDown" },
              { value: 200, suffix: "+", label: "болезней", sublabel: "провоцирует алкоголь", icon: "Activity" },
              { value: 43, suffix: "%", label: "дорожных аварий", sublabel: "происходит по вине пьяных", icon: "Car" },
            ].map((stat, i) => (
              <Section key={i}>
                <div
                  className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-6 text-center hover:border-[#c8332a]/40 transition-all hover:bg-[#1a1520] group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#c8332a]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c8332a]/20 transition-all">
                    <Icon name={stat.icon} size={18} className="text-[#c8332a]" fallback="AlertCircle" />
                  </div>
                  <div className="font-cormorant text-3xl md:text-4xl font-bold text-[#e05a50] mb-1">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-semibold text-[#e8e0d5] text-sm mb-1">{stat.label}</div>
                  <div className="text-[#6a5f5f] text-xs">{stat.sublabel}</div>
                </div>
              </Section>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Section>
              <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-8">
                <h3 className="font-cormorant text-2xl font-semibold mb-6 text-[#e8e0d5]">Россия в цифрах</h3>
                <div className="space-y-4">
                  {[
                    { label: "Употребляют алкоголь", percent: 70, color: "#c8332a" },
                    { label: "Употребляют регулярно", percent: 35, color: "#e05a50" },
                    { label: "Страдают алкоголизмом", percent: 8, color: "#ff7060" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#9a8f8a]">{item.label}</span>
                        <span className="text-[#e8e0d5] font-medium">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-[#1e2028] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
            <Section>
              <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-8">
                <h3 className="font-cormorant text-2xl font-semibold mb-6 text-[#e8e0d5]">Средний возраст начала</h3>
                <div className="space-y-4">
                  {[
                    { country: "🇷🇺 Россия", age: "13–14 лет" },
                    { country: "🇩🇪 Германия", age: "15–16 лет" },
                    { country: "🇺🇸 США", age: "15 лет" },
                    { country: "🌍 Мировой средний", age: "16–17 лет" },
                  ].map((item) => (
                    <div key={item.country} className="flex justify-between items-center border-b border-[#2a2030] pb-3">
                      <span className="text-[#9a8f8a]">{item.country}</span>
                      <span className="font-semibold text-[#e05a50]">{item.age}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ВЛИЯНИЕ НА ЗДОРОВЬЕ */}
      <section id="health" className="py-24 bg-[#0d0f14]">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-3 block">Медицинская сторона</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Влияние на<br /><em>организм человека</em></h2>
              <p className="text-[#6a5f5f] max-w-xl mx-auto">Алкоголь поражает каждый орган и систему организма</p>
            </div>
          </Section>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "Brain",
                title: "Мозг и нервная система",
                color: "#7c5cbf",
                items: ["Потеря памяти и когнитивных функций", "Депрессия и тревожность", "Повреждение нейронов", "Риск инсульта в 3 раза выше"],
                tag: "Необратимо"
              },
              {
                icon: "Heart",
                title: "Сердце и сосуды",
                color: "#c8332a",
                items: ["Кардиомиопатия (разрушение сердца)", "Аритмия и тахикардия", "Гипертония", "Риск инфаркта в 2–4 раза выше"],
                tag: "Опасно"
              },
              {
                icon: "Zap",
                title: "Печень и пищеварение",
                color: "#c8832a",
                items: ["Жировой гепатоз", "Алкогольный гепатит", "Цирроз (необратимо)", "Рак печени, поджелудочной"],
                tag: "Критично"
              },
              {
                icon: "Shield",
                title: "Иммунная система",
                color: "#2a7c5c",
                items: ["Снижение иммунитета", "Плохое заживление ран", "Рост риска инфекций", "Онкологические риски"],
                tag: "Системно"
              },
              {
                icon: "Baby",
                title: "Репродуктивная система",
                color: "#2a5c8a",
                items: ["Снижение фертильности", "Риск выкидыша", "Фетальный алкогольный синдром", "Врождённые дефекты у детей"],
                tag: "Поколения"
              },
              {
                icon: "Bone",
                title: "Кости и мышцы",
                color: "#6a7c2a",
                items: ["Остеопороз", "Атрофия мышц", "Повышенный риск переломов", "Слабость и потеря координации"],
                tag: "Скрытно"
              },
            ].map((card, i) => (
              <Section key={i}>
                <div
                  className="bg-[#13161d] border rounded-2xl p-6 h-full transition-all group hover:translate-y-[-2px]"
                  style={{ borderColor: card.color + "30" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.color + "20" }}>
                      <Icon name={card.icon} size={22} style={{ color: card.color }} fallback="AlertCircle" />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: card.color + "20", color: card.color }}>
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#e8e0d5] mb-4">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#7a6f6f]">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: card.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            ))}
          </div>

          <Section>
            <div className="bg-gradient-to-r from-[#1a0f0f] to-[#150f18] border border-[#c8332a]/20 rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="text-6xl">⚠️</div>
                <div>
                  <h3 className="font-cormorant text-2xl font-semibold text-[#e8e0d5] mb-3">Нет безопасной дозы</h3>
                  <p className="text-[#9a8f8a] leading-relaxed">
                    В 2018 году исследование в журнале <em className="text-[#e8e0d5]">The Lancet</em> на основе данных 195 стран показало: 
                    <strong className="text-[#e05a50]"> единственная безопасная доза алкоголя — нулевая</strong>. 
                    Даже один бокал вина в неделю повышает риск онкологических заболеваний. 
                    ВОЗ классифицирует алкоголь как канцероген 1-й группы (наивысшей опасности).
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ПРОФИЛАКТИКА */}
      <section id="prevention" className="py-24 bg-[#0c110e]">
        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="text-center mb-16">
              <span className="text-[#2a8c5c] text-sm font-medium tracking-widest uppercase mb-3 block">Защита и помощь</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Методы профилактики<br /><em className="text-[#3aaa70]">и защиты</em></h2>
              <p className="text-[#5a7060] max-w-xl mx-auto">Эффективные стратегии, которые работают на уровне личности, семьи и общества</p>
            </div>
          </Section>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                level: "👤 Личный уровень",
                color: "#2a8c5c",
                steps: [
                  { num: "01", title: "Осознанность", desc: "Ведите дневник употребления. Поставьте чёткие цели и отслеживайте прогресс" },
                  { num: "02", title: "Замените привычку", desc: "Найдите альтернативу: спорт, медитация, хобби — всё что занимает время и даёт удовольствие" },
                  { num: "03", title: "Окружение", desc: "Общайтесь с людьми, которые не пьют или поддерживают ваш выбор" },
                  { num: "04", title: "Обратитесь за помощью", desc: "Психолог или нарколог — это не слабость. Зависимость — это болезнь, которую лечат" },
                ]
              },
              {
                level: "👨‍👩‍👧 Семья и общество",
                color: "#2a5c8c",
                steps: [
                  { num: "01", title: "Ранний разговор", desc: "Объясняйте детям о вреде алкоголя до 10 лет — до первых контактов со сверстниками" },
                  { num: "02", title: "Личный пример", desc: "Дети копируют поведение родителей. Ваш пример — самый мощный инструмент профилактики" },
                  { num: "03", title: "Безопасная среда", desc: "Поддерживайте школьные программы профилактики и кружки для занятий молодёжи" },
                  { num: "04", title: "Поддержка близких", desc: "Если кто-то в семье зависим — изучите co-dependency и методы помощи без осуждения" },
                ]
              }
            ].map((block, bi) => (
              <Section key={bi}>
                <div className="bg-[#111814] border rounded-2xl p-8 h-full" style={{ borderColor: block.color + "30" }}>
                  <h3 className="font-cormorant text-2xl font-semibold mb-6" style={{ color: block.color }}>{block.level}</h3>
                  <div className="space-y-5">
                    {block.steps.map((step) => (
                      <div key={step.num} className="flex gap-4">
                        <div className="text-2xl font-cormorant font-bold opacity-30 leading-none mt-1" style={{ color: block.color }}>
                          {step.num}
                        </div>
                        <div>
                          <div className="font-semibold text-[#e8e0d5] mb-1">{step.title}</div>
                          <div className="text-[#6a7a6a] text-sm leading-relaxed">{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            ))}
          </div>

          <Section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "Phone", title: "Горячая линия", desc: "8-800-200-0-200", sub: "Бесплатно, анонимно" },
                { icon: "MapPin", title: "Наркологи РФ", desc: "narko.ru", sub: "Найдите специалиста" },
                { icon: "Users", title: "АА и АН", desc: "Группы поддержки", sub: "Анонимно, бесплатно" },
                { icon: "BookOpen", title: "Самопомощь", desc: "Дневник и план", sub: "Начните сегодня" },
              ].map((item, i) => (
                <div key={i} className="bg-[#111814] border border-[#1e2a22] rounded-xl p-5 text-center hover:border-[#2a8c5c]/40 transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#2a8c5c]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon name={item.icon} size={18} className="text-[#3aaa70]" fallback="CircleAlert" />
                  </div>
                  <div className="font-semibold text-[#e8e0d5] text-sm mb-1">{item.title}</div>
                  <div className="text-[#3aaa70] text-sm font-medium mb-1">{item.desc}</div>
                  <div className="text-[#5a7060] text-xs">{item.sub}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ЗАКЛЮЧЕНИЕ */}
      <section id="conclusion" className="py-24 bg-[#0d0f14]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Section>
            <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-3 block">Подведём итог</span>
            <h2 className="font-cormorant text-4xl md:text-6xl font-semibold mb-8 leading-tight">
              Выводы и<br /><em className="text-[#c8332a]">призыв к действию</em>
            </h2>
          </Section>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { emoji: "🚫", title: "Алкоголь — не норма", desc: "Культура «умеренного» потребления формировалась алкогольными компаниями. Научных доказательств «безопасного» количества не существует." },
              { emoji: "🧠", title: "Это болезнь", desc: "Алкоголизм — хроническое заболевание мозга. Как и при диабете, здесь нужны профессиональная помощь и поддержка, а не осуждение." },
              { emoji: "🌱", title: "Выход есть", desc: "Тысячи людей ежегодно побеждают зависимость. Раннее обращение за помощью значительно улучшает прогноз восстановления." },
            ].map((item, i) => (
              <Section key={i}>
                <div className="bg-[#13161d] border border-[#2a2030] rounded-2xl p-7 text-left">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="font-semibold text-[#e8e0d5] mb-3">{item.title}</h3>
                  <p className="text-[#6a5f5f] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Section>
            ))}
          </div>

          <Section>
            <div className="bg-gradient-to-br from-[#1a0f0f] to-[#0f0f1a] border border-[#c8332a]/25 rounded-3xl p-10 md:p-14">
              <p className="font-cormorant text-2xl md:text-3xl italic text-[#c8a090] leading-relaxed mb-8">
                «Здоровье — единственная роскошь, которую нельзя купить после того, как её потерял.»
              </p>
              <div className="w-12 h-px bg-[#c8332a]/40 mx-auto mb-8" />
              <p className="text-[#6a5f5f] mb-8 leading-relaxed max-w-2xl mx-auto">
                Знание — первый шаг к изменениям. Если вы или ваши близкие сталкиваетесь с проблемой алкоголя — 
                обратитесь за помощью. Анонимно и безвозмездно.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:88002000200"
                  className="inline-flex items-center justify-center gap-2 bg-[#c8332a] hover:bg-[#a8251e] text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:scale-105"
                >
                  <Icon name="Phone" size={18} />
                  Позвонить на горячую линию
                </a>
                <button
                  onClick={() => scrollTo("intro")}
                  className="inline-flex items-center justify-center gap-2 border border-[#3a2f2f] hover:border-[#c8332a]/40 text-[#9a8f8a] hover:text-[#e8e0d5] px-8 py-3.5 rounded-xl font-medium transition-all"
                >
                  <Icon name="ArrowUp" size={18} />
                  Вернуться в начало
                </button>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e1a1a] py-8 text-center text-[#4a3f3f] text-sm">
        <p>Материалы составлены на основе данных ВОЗ, Росстата и научных публикаций • 2024</p>
      </footer>
    </div>
  );
}