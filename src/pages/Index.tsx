import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/80f03b47-f833-4671-9abe-fdb1ff32b113/files/c6cc3b25-d07b-4bb0-abbc-220e61b0d9d9.jpg";

const slides = [
  {
    id: "title",
    label: "Титул",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <img src={HERO_IMAGE} alt="" className="w-32 h-32 object-cover rounded-full mx-auto opacity-50 border-4 border-[#c8332a]/40 mb-8" />
        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold leading-tight mb-3 text-[#e8e0d5]">
          Алкоголь —<br />
          <span className="text-[#c8332a] italic">угроза здоровью</span>
        </h1>
        <p className="text-[#6a5f5f] text-base mb-10">Факты, статистика и методы профилактики</p>
        <div className="border-t border-[#2a2030] pt-6 space-y-1">
          <p className="text-[#6a5f5f] text-sm">Выполнил: <span className="text-[#e8e0d5] font-medium">Илья Садомов, 9Д</span></p>
          <p className="text-[#6a5f5f] text-sm">Руководитель: <span className="text-[#e8e0d5] font-medium">Екатерина Геннадьевна</span></p>
        </div>
      </div>
    ),
  },

  {
    id: "intro",
    label: "Введение",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-3xl mx-auto w-full">
        <span className="text-[#c8332a] text-xs font-medium tracking-widest uppercase mb-3 block">Введение</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Что такое алкоголь?
        </h2>
        <ul className="space-y-5">
          {[
            { emoji: "🍷", text: "Этанол — психоактивное вещество, вызывающее зависимость" },
            { emoji: "⚠️", text: "ВОЗ признаёт алкоголь канцерогеном 1-й группы — наравне с табаком" },
            { emoji: "🌍", text: "Ежегодно от алкоголя погибает более 3 миллионов человек в мире" },
            { emoji: "🇷🇺", text: "Россия входит в топ-10 стран по потреблению алкоголя на душу населения" },
            { emoji: "🎯", text: "Цель: показать реальный вред и рассказать о профилактике" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="text-2xl leading-none mt-0.5">{item.emoji}</span>
              <span className="text-[#c8c0b8] text-lg leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },

  {
    id: "stats",
    label: "Статистика",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-3xl mx-auto w-full">
        <span className="text-[#c8332a] text-xs font-medium tracking-widest uppercase mb-3 block">Статистика и факты</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Цифры говорят сами за себя
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { value: "3 млн+", label: "смертей в год в мире" },
            { value: "5%", label: "всех смертей связаны с алкоголем" },
            { value: "200+", label: "болезней провоцирует алкоголь" },
            { value: "43%", label: "аварий — по вине пьяных водителей" },
          ].map((s, i) => (
            <div key={i} className="bg-[#15181f] border border-[#2a2030] rounded-xl p-5">
              <div className="font-cormorant text-3xl font-bold text-[#e05a50] mb-1">{s.value}</div>
              <div className="text-[#7a6f6f] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[
            { label: "Употребляют алкоголь в России", percent: 70, color: "#c8332a" },
            { label: "Употребляют регулярно", percent: 35, color: "#e05a50" },
            { label: "Страдают алкоголизмом", percent: 8, color: "#ff7060" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="text-[#7a6f6f] text-sm w-56 flex-shrink-0">{item.label}</span>
              <div className="flex-1 h-2 bg-[#1e2028] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
              </div>
              <span className="text-[#e8e0d5] font-semibold text-sm w-10 text-right">{item.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    id: "health",
    label: "Здоровье",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-3xl mx-auto w-full">
        <span className="text-[#c8332a] text-xs font-medium tracking-widest uppercase mb-3 block">Влияние на здоровье</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Алкоголь поражает каждый орган
        </h2>
        <ul className="space-y-4">
          {[
            { emoji: "🧠", organ: "Мозг", effect: "Потеря памяти, депрессия, риск инсульта в 3 раза выше" },
            { emoji: "❤️", organ: "Сердце", effect: "Аритмия, гипертония, риск инфаркта в 4 раза выше" },
            { emoji: "🫁", organ: "Печень", effect: "Гепатит, цирроз — необратимое разрушение органа" },
            { emoji: "🛡️", organ: "Иммунитет", effect: "Снижение защиты, рост онкологических рисков" },
            { emoji: "🦴", organ: "Кости", effect: "Остеопороз, атрофия мышц, переломы" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="text-2xl leading-none mt-0.5">{item.emoji}</span>
              <div>
                <span className="text-[#e8e0d5] font-semibold">{item.organ}: </span>
                <span className="text-[#7a6f6f]">{item.effect}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 bg-[#1a0f0f] border border-[#c8332a]/20 rounded-xl px-6 py-4 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-[#9a8f8a] text-sm">
            <strong className="text-[#e05a50]">Нет безопасной дозы</strong> — любое количество алкоголя вредно для здоровья (ВОЗ, 2018)
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "prevention",
    label: "Профилактика",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-3xl mx-auto w-full">
        <span className="text-[#2a8c5c] text-xs font-medium tracking-widest uppercase mb-3 block">Методы профилактики</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Как защитить себя и близких?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-[#3aaa70] font-semibold mb-4">👤 Лично</p>
            <ul className="space-y-3">
              {[
                "Осознать проблему и поставить цель",
                "Заменить привычку — спорт, хобби",
                "Выбрать окружение, которое поддерживает",
                "Обратиться к врачу — зависимость лечится",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3aaa70] mt-2 flex-shrink-0" />
                  <span className="text-[#c8c0b8] text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#4a8cbf] font-semibold mb-4">👨‍👩‍👧 Семья</p>
            <ul className="space-y-3">
              {[
                "Говорить с детьми о вреде алкоголя до 10 лет",
                "Показывать личный пример",
                "Поддерживать школьные программы профилактики",
                "Помогать зависимым близким без осуждения",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4a8cbf] mt-2 flex-shrink-0" />
                  <span className="text-[#c8c0b8] text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 bg-[#111814] border border-[#2a8c5c]/20 rounded-xl px-6 py-4 flex items-center gap-3">
          <Icon name="Phone" size={16} className="text-[#3aaa70] flex-shrink-0" />
          <p className="text-[#6a7a6a] text-sm">Бесплатная горячая линия помощи: <strong className="text-[#e8e0d5]">8-800-200-0-200</strong></p>
        </div>
      </div>
    ),
  },

  {
    id: "conclusion",
    label: "Заключение",
    content: (
      <div className="flex flex-col justify-center h-full px-8 md:px-20 max-w-3xl mx-auto w-full">
        <span className="text-[#c8332a] text-xs font-medium tracking-widest uppercase mb-3 block">Заключение</span>
        <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">
          Выводы
        </h2>
        <ul className="space-y-5 mb-10">
          {[
            { emoji: "🚫", text: "Безопасной дозы алкоголя не существует — это научный факт" },
            { emoji: "🧠", text: "Алкоголизм — болезнь мозга, а не слабость характера" },
            { emoji: "📉", text: "Алкоголь — причина более 200 заболеваний и миллионов смертей" },
            { emoji: "🌱", text: "Зависимость поддаётся лечению при своевременном обращении" },
            { emoji: "💡", text: "Профилактика с детства — лучший способ защиты" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="text-2xl leading-none mt-0.5">{item.emoji}</span>
              <span className="text-[#c8c0b8] text-lg leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-[#2a2030] pt-6">
          <p className="font-cormorant text-xl italic text-[#6a5f5f] mb-4">
            «Здоровье — единственная роскошь, которую нельзя купить после того, как её потерял.»
          </p>
          <p className="text-[#4a3f3f] text-sm">Выполнил: <span className="text-[#6a5f5f]">Илья Садомов, 9Д</span> · Руководитель: <span className="text-[#6a5f5f]">Екатерина Геннадьевна</span></p>
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
