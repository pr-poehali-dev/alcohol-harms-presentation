import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/80f03b47-f833-4671-9abe-fdb1ff32b113/files/c6cc3b25-d07b-4bb0-abbc-220e61b0d9d9.jpg";

const slides = [
  // Слайд 0 — Титульный
  {
    id: "title",
    label: "Титул",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="mb-6">
          <img src={HERO_IMAGE} alt="" className="w-40 h-40 object-cover rounded-full mx-auto opacity-60 border-4 border-[#c8332a]/40" />
        </div>
        <div className="inline-block bg-[#c8332a]/15 border border-[#c8332a]/30 rounded-full px-5 py-1.5 mb-6">
          <span className="text-[#e05a50] text-sm font-medium tracking-wide">Учебная презентация</span>
        </div>
        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold leading-tight mb-4 text-[#e8e0d5]">
          Алкоголь —<br />
          <span className="text-[#c8332a] italic">угроза здоровью</span>
        </h1>
        <p className="text-[#9a8f8a] text-lg max-w-md mb-10 leading-relaxed">
          Факты, статистика и методы профилактики
        </p>
        <div className="border-t border-[#2a2030] pt-8 w-full max-w-sm">
          <p className="text-[#6a5f5f] text-sm mb-1">Выполнил: <span className="text-[#e8e0d5] font-medium">Илья Садомов, 9Д</span></p>
          <p className="text-[#6a5f5f] text-sm">Руководитель: <span className="text-[#e8e0d5] font-medium">Екатерина Геннадьевна</span></p>
        </div>
      </div>
    ),
  },

  // Слайд 1 — Введение
  {
    id: "intro",
    label: "Введение",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto w-full">
        <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-4 block">Слайд 1 — Введение</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Что такое алкоголь<br />и почему это проблема?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-6">
            <div className="text-3xl mb-3">🍷</div>
            <h3 className="font-semibold text-[#e8e0d5] mb-2">Что такое алкоголь</h3>
            <p className="text-[#7a6f6f] text-sm leading-relaxed">
              Этанол — психоактивное вещество, вызывающее зависимость. ВОЗ признаёт его канцерогеном 1-й группы — наравне с табаком и асбестом.
            </p>
          </div>
          <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-6">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-[#e8e0d5] mb-2">Масштаб проблемы</h3>
            <p className="text-[#7a6f6f] text-sm leading-relaxed">
              Алкоголь — третья по значимости причина смертности в мире. Ежегодно от него погибает более <strong className="text-[#e8e0d5]">3 миллионов человек</strong>.
            </p>
          </div>
          <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-6">
            <div className="text-3xl mb-3">🇷🇺</div>
            <h3 className="font-semibold text-[#e8e0d5] mb-2">Ситуация в России</h3>
            <p className="text-[#7a6f6f] text-sm leading-relaxed">
              Россия входит в топ-10 стран по потреблению алкоголя на душу населения. Около 70% взрослых россиян употребляют алкоголь.
            </p>
          </div>
          <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-[#e8e0d5] mb-2">Цель презентации</h3>
            <p className="text-[#7a6f6f] text-sm leading-relaxed">
              Показать реальный вред алкоголя на основе научных данных и рассказать о методах профилактики зависимости.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // Слайд 2 — Статистика
  {
    id: "stats",
    label: "Статистика",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto w-full">
        <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-4 block">Слайд 2 — Статистика и факты</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Цифры, которые<br />говорят сами за себя
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { value: "3 млн+", label: "смертей в год", sub: "в мире от алкоголя", icon: "Skull" },
            { value: "5%", label: "всех смертей", sub: "связаны с алкоголем", icon: "TrendingDown" },
            { value: "200+", label: "болезней", sub: "провоцирует алкоголь", icon: "Activity" },
            { value: "43%", label: "аварий на дорогах", sub: "по вине пьяных водителей", icon: "Car" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-5 text-center">
              <div className="w-9 h-9 rounded-full bg-[#c8332a]/10 flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={16} className="text-[#c8332a]" fallback="AlertCircle" />
              </div>
              <div className="font-cormorant text-2xl font-bold text-[#e05a50] mb-1">{stat.value}</div>
              <div className="font-semibold text-[#e8e0d5] text-xs mb-1">{stat.label}</div>
              <div className="text-[#6a5f5f] text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#15181f] border border-[#2a2030] rounded-2xl p-6">
          <h3 className="font-semibold text-[#e8e0d5] mb-4">Россия в цифрах (Росстат)</h3>
          <div className="space-y-3">
            {[
              { label: "Употребляют алкоголь", percent: 70, color: "#c8332a" },
              { label: "Употребляют регулярно", percent: 35, color: "#e05a50" },
              { label: "Страдают алкоголизмом", percent: 8, color: "#ff7060" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="text-[#9a8f8a] text-sm w-52 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-2 bg-[#1e2028] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                </div>
                <span className="text-[#e8e0d5] font-semibold text-sm w-10 text-right">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // Слайд 3 — Влияние на здоровье
  {
    id: "health",
    label: "Здоровье",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto w-full">
        <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-4 block">Слайд 3 — Влияние на здоровье</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Алкоголь поражает<br />каждый орган
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "Brain", title: "Мозг", color: "#7c5cbf", items: ["Потеря памяти", "Депрессия, тревожность", "Риск инсульта ×3"] },
            { icon: "Heart", title: "Сердце", color: "#c8332a", items: ["Кардиомиопатия", "Аритмия, гипертония", "Риск инфаркта ×4"] },
            { icon: "Zap", title: "Печень", color: "#c8832a", items: ["Жировой гепатоз", "Алкогольный гепатит", "Цирроз (необратимо)"] },
            { icon: "ShieldOff", title: "Иммунитет", color: "#2a7c5c", items: ["Снижение иммунитета", "Плохое заживление ран", "Онкологические риски"] },
            { icon: "Baby", title: "Репродукция", color: "#2a5c8a", items: ["Снижение фертильности", "Риск выкидыша", "Врождённые дефекты"] },
            { icon: "Bone", title: "Кости", color: "#6a7c2a", items: ["Остеопороз", "Атрофия мышц", "Повышенный риск переломов"] },
          ].map((card, i) => (
            <div key={i} className="bg-[#13161d] border rounded-xl p-4" style={{ borderColor: card.color + "40" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color + "20" }}>
                  <Icon name={card.icon} size={16} style={{ color: card.color }} fallback="AlertCircle" />
                </div>
                <span className="font-semibold text-[#e8e0d5] text-sm">{card.title}</span>
              </div>
              <ul className="space-y-1">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#7a6f6f]">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: card.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-[#1a0f0f] border border-[#c8332a]/20 rounded-xl px-6 py-4 flex items-center gap-4">
          <span className="text-2xl">⚠️</span>
          <p className="text-[#9a8f8a] text-sm leading-relaxed">
            <strong className="text-[#e05a50]">Нет безопасной дозы</strong> — ВОЗ и журнал The Lancet (195 стран, 2018): единственная безопасная доза алкоголя — нулевая.
          </p>
        </div>
      </div>
    ),
  },

  // Слайд 4 — Профилактика
  {
    id: "prevention",
    label: "Профилактика",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto w-full">
        <span className="text-[#2a8c5c] text-sm font-medium tracking-widest uppercase mb-4 block">Слайд 4 — Методы профилактики</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Как защитить себя<br /><span className="text-[#3aaa70]">и близких?</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#111814] border border-[#2a8c5c]/25 rounded-2xl p-6">
            <h3 className="font-cormorant text-xl font-semibold text-[#3aaa70] mb-4">👤 Личный уровень</h3>
            <div className="space-y-3">
              {[
                { n: "01", t: "Осознанность", d: "Ведите дневник — отслеживайте и ставьте цели" },
                { n: "02", t: "Замените привычку", d: "Спорт, медитация, хобби — альтернативы без вреда" },
                { n: "03", t: "Окружение", d: "Общайтесь с людьми, которые поддерживают ваш выбор" },
                { n: "04", t: "Обратитесь за помощью", d: "Психолог или нарколог — зависимость лечится" },
              ].map((s) => (
                <div key={s.n} className="flex gap-3">
                  <span className="font-cormorant text-xl font-bold text-[#2a8c5c]/40">{s.n}</span>
                  <div>
                    <div className="text-[#e8e0d5] text-sm font-semibold">{s.t}</div>
                    <div className="text-[#5a7060] text-xs">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#111814] border border-[#2a5c8c]/25 rounded-2xl p-6">
            <h3 className="font-cormorant text-xl font-semibold text-[#4a8cbf] mb-4">👨‍👩‍👧 Семья и общество</h3>
            <div className="space-y-3">
              {[
                { n: "01", t: "Ранний разговор", d: "Объясните детям о вреде до 10 лет" },
                { n: "02", t: "Личный пример", d: "Дети копируют поведение родителей" },
                { n: "03", t: "Безопасная среда", d: "Поддерживайте школьные программы профилактики" },
                { n: "04", t: "Поддержка близких", d: "Помогайте без осуждения — изучите методы помощи" },
              ].map((s) => (
                <div key={s.n} className="flex gap-3">
                  <span className="font-cormorant text-xl font-bold text-[#2a5c8c]/40">{s.n}</span>
                  <div>
                    <div className="text-[#e8e0d5] text-sm font-semibold">{s.t}</div>
                    <div className="text-[#4a5a6a] text-xs">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "Phone", title: "Горячая линия", desc: "8-800-200-0-200", sub: "Бесплатно" },
            { icon: "MapPin", title: "Наркологи РФ", desc: "narko.ru", sub: "Специалисты" },
            { icon: "Users", title: "Группы АА / АН", desc: "Анонимно", sub: "Бесплатно" },
            { icon: "BookOpen", title: "Самопомощь", desc: "Дневник и план", sub: "Сегодня" },
          ].map((item, i) => (
            <div key={i} className="bg-[#111814] border border-[#1e2a22] rounded-xl p-4 text-center">
              <Icon name={item.icon} size={18} className="text-[#3aaa70] mx-auto mb-2" fallback="CircleAlert" />
              <div className="text-[#e8e0d5] text-xs font-semibold mb-1">{item.title}</div>
              <div className="text-[#3aaa70] text-xs">{item.desc}</div>
              <div className="text-[#5a7060] text-xs">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // Слайд 5 — Заключение
  {
    id: "conclusion",
    label: "Заключение",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto w-full">
        <span className="text-[#c8332a] text-sm font-medium tracking-widest uppercase mb-4 block">Слайд 5 — Заключение и выводы</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Выводы
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            { emoji: "🚫", title: "Нет безопасной дозы", desc: "Алкоголь в любом количестве повышает риск онкологии, болезней сердца и мозга. Понятие «умеренное потребление» — миф." },
            { emoji: "🧠", title: "Алкоголизм — болезнь", desc: "Это хроническое заболевание мозга, а не слабость характера. Оно поддаётся лечению при своевременном обращении за помощью." },
            { emoji: "🌱", title: "Выход есть всегда", desc: "Тысячи людей ежегодно побеждают зависимость. Главное — сделать первый шаг и обратиться за поддержкой." },
          ].map((item, i) => (
            <div key={i} className="bg-[#13161d] border border-[#2a2030] rounded-2xl p-6">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold text-[#e8e0d5] mb-2 text-sm">{item.title}</h3>
              <p className="text-[#6a5f5f] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-[#1a0f0f] to-[#0f0f1a] border border-[#c8332a]/25 rounded-2xl p-7 text-center">
          <p className="font-cormorant text-xl md:text-2xl italic text-[#c8a090] leading-relaxed mb-5">
            «Здоровье — единственная роскошь, которую нельзя купить после того, как её потерял.»
          </p>
          <p className="text-[#6a5f5f] text-sm max-w-xl mx-auto">
            Материалы составлены на основе данных ВОЗ, Росстата и научных публикаций
          </p>
          <div className="mt-5 pt-5 border-t border-[#2a2030]">
            <p className="text-[#6a5f5f] text-sm">Выполнил: <span className="text-[#e8e0d5] font-medium">Илья Садомов</span> · Руководитель: <span className="text-[#e8e0d5] font-medium">Екатерина Геннадьевна</span></p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  return (
    <div className="h-screen bg-[#0d0f14] text-[#e8e0d5] font-golos flex flex-col overflow-hidden">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#1e1a1a] flex-shrink-0">
        <span className="font-cormorant text-[#c8332a] text-lg font-semibold italic">Алкоголь & здоровье</span>
        <div className="hidden md:flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                current === i ? "bg-[#c8332a]/20 text-[#e05a50]" : "text-[#6a5f5f] hover:text-[#e8e0d5]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <span className="text-[#4a3f3f] text-sm">{current + 1} / {slides.length}</span>
      </div>

      {/* SLIDE */}
      <div className="flex-1 overflow-y-auto">
        {slides[current].content}
      </div>

      {/* BOTTOM NAV */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#1e1a1a] flex-shrink-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2 rounded-lg border border-[#2a2030] text-[#9a8f8a] hover:text-[#e8e0d5] hover:border-[#c8332a]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <Icon name="ChevronLeft" size={16} /> Назад
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${
                i === current ? "w-6 h-2 bg-[#c8332a]" : "w-2 h-2 bg-[#2a2030] hover:bg-[#4a3f3f]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#c8332a] hover:bg-[#a8251e] text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Далее <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
}