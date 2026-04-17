import { useState } from "react";
import Icon from "@/components/ui/icon";

const PPTX_URL = "https://functions.poehali.dev/94a5965c-a8c3-437c-bb6b-c18a07e7a719";
const HERO_IMAGE = "https://cdn.poehali.dev/projects/80f03b47-f833-4671-9abe-fdb1ff32b113/files/c6cc3b25-d07b-4bb0-abbc-220e61b0d9d9.jpg";

function Slide({ label, title, children }: { label: string; title: string; children: React.ReactNode; }) {
  return (
    <div className="flex flex-col justify-center min-h-full px-8 md:px-20 max-w-3xl mx-auto w-full py-8">
      <span className="text-[#c8332a] text-xs font-medium tracking-widest uppercase mb-3 block">{label}</span>
      <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8 text-[#e8e0d5]">{title}</h2>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: { emoji: string; title?: string; text: string }[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="text-xl leading-none mt-0.5 w-7 flex-shrink-0">{item.emoji}</span>
          <span className="text-[#c8c0b8] text-base leading-snug">
            {item.title && <strong className="text-[#e8e0d5]">{item.title}: </strong>}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Note({ text }: { text: string }) {
  return (
    <div className="mt-7 bg-[#1a0f0f] border border-[#c8332a]/20 rounded-xl px-5 py-3 flex items-start gap-3">
      <span className="text-lg mt-0.5">⚠️</span>
      <p className="text-[#9a8f8a] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

function Bars({ items }: { items: { label: string; percent: number; color: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-4">
          <span className="text-[#7a6f6f] text-sm w-64 flex-shrink-0">{item.label}</span>
          <div className="flex-1 h-2 bg-[#1e2028] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
          </div>
          <span className="text-[#e8e0d5] font-semibold text-sm w-10 text-right">{item.percent}%</span>
        </div>
      ))}
    </div>
  );
}

const slides = [
  // 0 — Титул
  {
    id: "title",
    label: "Титул",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <img src={HERO_IMAGE} alt="" className="w-32 h-32 object-cover rounded-full mx-auto opacity-50 border-4 border-[#c8332a]/40 mb-8" />
        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold leading-tight mb-3 text-[#e8e0d5]">
          Алкоголь —<br /><span className="text-[#c8332a] italic">угроза здоровью</span>
        </h1>
        <p className="text-[#6a5f5f] text-base mb-10">Факты, статистика и методы профилактики</p>
        <div className="border-t border-[#2a2030] pt-6 space-y-1">
          <p className="text-[#6a5f5f] text-sm">Выполнил: <span className="text-[#e8e0d5] font-medium">Илья Садомов, 9Д</span></p>
          <p className="text-[#6a5f5f] text-sm">Руководитель: <span className="text-[#e8e0d5] font-medium">Екатерина Геннадьевна</span></p>
        </div>
      </div>
    ),
  },

  // 1 — Введение
  {
    id: "intro",
    label: "Введение",
    content: (
      <Slide label="Слайд 1 — Введение" title="Что такое алкоголь?">
        <Bullets items={[
          { emoji: "🍷", title: "Определение", text: "Этанол (C₂H₅OH) — психоактивное вещество, подавляющее работу центральной нервной системы и вызывающее физическую и психологическую зависимость" },
          { emoji: "⚠️", title: "Классификация ВОЗ", text: "Алкоголь признан канцерогеном 1-й группы — наравне с табаком, асбестом и радиацией. Безопасной дозы не существует" },
          { emoji: "🌍", title: "Мировая проблема", text: "Ежегодно от последствий употребления алкоголя погибает более 3 миллионов человек — больше, чем от СПИДа и туберкулёза вместе" },
          { emoji: "🇷🇺", title: "Россия", text: "Входит в топ-10 стран по потреблению алкоголя. Средний возраст первого употребления — 13–14 лет, что является одним из самых низких показателей в мире" },
          { emoji: "🎯", title: "Цель презентации", text: "Донести научно обоснованную информацию о вреде алкоголя и показать эффективные методы профилактики" },
        ]} />
      </Slide>
    ),
  },

  // 2 — Статистика мировая
  {
    id: "stats-world",
    label: "Статистика",
    content: (
      <Slide label="Слайд 2 — Мировая статистика" title="Масштаб проблемы в мире">
        <div className="grid grid-cols-2 gap-4 mb-7">
          {[
            { value: "3 млн+", label: "смертей ежегодно", sub: "третья причина смертности в мире" },
            { value: "5,1%", label: "от всех смертей", sub: "связаны с употреблением алкоголя" },
            { value: "200+", label: "заболеваний", sub: "напрямую связаны с алкоголем" },
            { value: "237 млн", label: "человек в мире", sub: "страдают расстройствами от алкоголя" },
          ].map((s, i) => (
            <div key={i} className="bg-[#15181f] border border-[#2a2030] rounded-xl p-4">
              <div className="font-cormorant text-3xl font-bold text-[#e05a50] mb-1">{s.value}</div>
              <div className="text-[#e8e0d5] text-sm font-medium mb-0.5">{s.label}</div>
              <div className="text-[#5a5060] text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
        <Bullets items={[
          { emoji: "🚗", text: "43% всех смертельных ДТП в мире происходит с участием пьяных водителей" },
          { emoji: "💔", text: "Алкоголь — причина 30% самоубийств и 40% бытового насилия" },
          { emoji: "💰", text: "Экономический ущерб от алкоголя в мире — более 1,7 трлн долларов в год" },
        ]} />
      </Slide>
    ),
  },

  // 3 — Статистика Россия
  {
    id: "stats-russia",
    label: "Россия",
    content: (
      <Slide label="Слайд 3 — Статистика в России" title="Алкоголь в России: цифры Росстата">
        <div className="mb-7">
          <Bars items={[
            { label: "Употребляют алкоголь (взрослые)", percent: 70, color: "#c8332a" },
            { label: "Употребляют регулярно (раз в неделю)", percent: 35, color: "#e05a50" },
            { label: "Страдают алкогольной зависимостью", percent: 8, color: "#ff7060" },
            { label: "Начали пить до 15 лет", percent: 52, color: "#ff9080" },
          ]} />
        </div>
        <Bullets items={[
          { emoji: "📉", text: "Средняя продолжительность жизни у зависимых мужчин сокращается на 15–20 лет" },
          { emoji: "🏥", text: "Каждая пятая госпитализация в России связана с алкоголем" },
          { emoji: "👶", text: "Около 50 000 детей ежегодно рождаются с признаками фетального алкогольного синдрома" },
          { emoji: "👮", text: "Более 60% всех преступлений в России совершается в состоянии алкогольного опьянения" },
        ]} />
      </Slide>
    ),
  },

  // 4 — Влияние на мозг
  {
    id: "health-brain",
    label: "Мозг",
    content: (
      <Slide label="Слайд 4 — Влияние на нервную систему" title="Что алкоголь делает с мозгом">
        <Bullets items={[
          { emoji: "🧠", title: "Нейроны", text: "Этанол разрушает нейронные связи. Даже одна «пьяная» ночь уничтожает тысячи клеток мозга, которые не восстанавливаются" },
          { emoji: "💭", title: "Память и концентрация", text: "Регулярное употребление снижает способность запоминать, концентрироваться и принимать решения. У молодёжи эффект в 2 раза сильнее" },
          { emoji: "😔", title: "Психика", text: "Алкоголь — депрессант. Он усиливает тревогу и депрессию, а не снимает их. Риск психических расстройств возрастает в 3–4 раза" },
          { emoji: "🔄", title: "Зависимость", text: "Мозг перестраивается: без алкоголя возникают «ломка», раздражительность, бессонница. Это физиологическая болезнь, не слабохарактерность" },
          { emoji: "⚡", title: "Инсульт", text: "Даже умеренное употребление повышает риск инсульта в 1,5–3 раза. У молодых людей 25–35 лет алкоголь — главная причина инсульта" },
        ]} />
        <Note text="<strong style='color:#e05a50'>Особая опасность для подростков:</strong> мозг формируется до 25 лет. Алкоголь в юном возрасте наносит необратимый урон интеллекту и эмоциям." />
      </Slide>
    ),
  },

  // 5 — Влияние на тело
  {
    id: "health-body",
    label: "Органы",
    content: (
      <Slide label="Слайд 5 — Влияние на органы" title="Алкоголь поражает весь организм">
        <Bullets items={[
          { emoji: "❤️", title: "Сердце", text: "Кардиомиопатия, аритмия, гипертония. Риск инфаркта выше в 2–4 раза. Пьющие люди нередко умирают от внезапной остановки сердца" },
          { emoji: "🫁", title: "Печень", text: "Жировой гепатоз → алкогольный гепатит → цирроз. Цирроз необратим: печень перестаёт функционировать. Риск рака печени выше в 5 раз" },
          { emoji: "🤢", title: "Поджелудочная железа", text: "Панкреатит — крайне болезненное воспаление. Хроническая форма ведёт к сахарному диабету и онкологии" },
          { emoji: "🦷", title: "Желудок и кишечник", text: "Язвы, гастрит, нарушение всасывания питательных веществ, рак пищевода и желудка" },
          { emoji: "🦴", title: "Кости и мышцы", text: "Остеопороз (кости теряют прочность), атрофия мышечной ткани, постоянная слабость" },
          { emoji: "🛡️", title: "Иммунитет", text: "Снижение защиты организма: инфекции протекают тяжелее, раны хуже заживают, онкологические риски значительно растут" },
        ]} />
      </Slide>
    ),
  },

  // 6 — Алкоголь и молодёжь
  {
    id: "youth",
    label: "Молодёжь",
    content: (
      <Slide label="Слайд 6 — Алкоголь и молодёжь" title="Почему особенно опасно в юном возрасте">
        <Bullets items={[
          { emoji: "🧬", title: "Формирование мозга", text: "До 25 лет мозг активно развивается. Алкоголь нарушает этот процесс: снижается IQ, ухудшается память, нарушается контроль над эмоциями" },
          { emoji: "⚡", title: "Зависимость быстрее", text: "У подростков зависимость формируется в 2–4 раза быстрее, чем у взрослых. 1–2 года регулярного употребления могут привести к алкоголизму" },
          { emoji: "📚", title: "Учёба и карьера", text: "Снижение успеваемости, проблемы с концентрацией, прогулы. Исследования показывают: начавшие пить в школе в 2 раза реже заканчивают вуз" },
          { emoji: "👥", title: "Социальные последствия", text: "Конфликты в семье, потеря друзей, правонарушения. 70% подростковых правонарушений совершается под воздействием алкоголя" },
          { emoji: "💊", title: "Ворота к наркотикам", text: "Алкоголь — «входные ворота»: большинство наркозависимых начинали именно с алкоголя в подростковом возрасте" },
        ]} />
        <Note text="Средний возраст первого употребления алкоголя в России — <strong style='color:#e05a50'>13–14 лет</strong>. Это один из самых низких показателей в Европе." />
      </Slide>
    ),
  },

  // 7 — Мифы об алкоголе
  {
    id: "myths",
    label: "Мифы",
    content: (
      <Slide label="Слайд 7 — Мифы и правда" title="Популярные мифы об алкоголе">
        <div className="space-y-4">
          {[
            { myth: "«Красное вино полезно для сердца»", fact: "Это миф, продвигаемый алкогольной индустрией. Исследования 2019 года (195 стран) доказали: любая доза увеличивает онкологический риск" },
            { myth: "«Пиво — это не алкоголь»", fact: "Пиво содержит 4–8% этанола. По объёму потребляемого алкоголя пиво занимает первое место в России" },
            { myth: "«Алкоголь снимает стресс»", fact: "Алкоголь — депрессант ЦНС. Он временно притупляет эмоции, но после трезвения стресс и тревога усиливаются" },
            { myth: "«Можно научиться «культурно пить»»", fact: "Для людей с генетической предрасположенностью это невозможно. Контролируемое употребление — иллюзия на начальном этапе зависимости" },
            { myth: "«Алкоголь согревает»", fact: "Ощущение тепла — обман: сосуды расширяются, тело быстрее теряет тепло. Алкоголь — причина гибели людей от переохлаждения" },
          ].map((item, i) => (
            <div key={i} className="border border-[#2a2030] rounded-xl p-4">
              <p className="text-[#e05a50] text-sm font-medium mb-1">❌ {item.myth}</p>
              <p className="text-[#7a6f6f] text-sm leading-snug">✅ {item.fact}</p>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  // 8 — Профилактика
  {
    id: "prevention",
    label: "Профилактика",
    content: (
      <Slide label="Слайд 8 — Методы профилактики" title="Как защитить себя и близких">
        <div className="grid md:grid-cols-2 gap-8 mb-7">
          <div>
            <p className="text-[#3aaa70] font-semibold mb-4">👤 Личный уровень</p>
            <ul className="space-y-3">
              {[
                "Осознать проблему и честно оценить своё употребление",
                "Найти замену: спорт, творчество, волонтёрство",
                "Формировать окружение без алкоголя",
                "Не бояться просить помощи — это сила, не слабость",
                "Использовать техники управления стрессом: дыхание, медитация",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3aaa70] mt-2 flex-shrink-0" />
                  <span className="text-[#c8c0b8] text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#4a8cbf] font-semibold mb-4">👨‍👩‍👧 Семья и школа</p>
            <ul className="space-y-3">
              {[
                "Открыто говорить с детьми о вреде алкоголя с 8–10 лет",
                "Родители — главный пример: дети копируют поведение",
                "Поддерживать кружки и секции — занятой ребёнок не скучает",
                "Не осуждать зависимых — поддержка важнее морализаторства",
                "Участвовать в школьных программах профилактики",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4a8cbf] mt-2 flex-shrink-0" />
                  <span className="text-[#c8c0b8] text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-[#111814] border border-[#2a8c5c]/20 rounded-xl px-5 py-3 flex items-center gap-3">
          <Icon name="Phone" size={15} className="text-[#3aaa70] flex-shrink-0" />
          <p className="text-[#6a7a6a] text-sm">Горячая линия психологической помощи: <strong className="text-[#e8e0d5]">8-800-200-0-200</strong> — бесплатно, анонимно, круглосуточно</p>
        </div>
      </Slide>
    ),
  },

  // 9 — Заключение
  {
    id: "conclusion",
    label: "Заключение",
    content: (
      <Slide label="Слайд 9 — Заключение" title="Выводы">
        <Bullets items={[
          { emoji: "🚫", title: "Нет безопасной дозы", text: "Любое количество алкоголя наносит вред организму — это доказанный научный факт, подтверждённый ВОЗ и исследованиями в 195 странах" },
          { emoji: "🧠", title: "Алкоголизм — болезнь", text: "Это хроническое заболевание мозга, требующее лечения. Осуждение не помогает — помогают поддержка и профессиональная помощь" },
          { emoji: "👶", title: "Особая опасность в юности", text: "Мозг подростка уязвим вдвойне: зависимость развивается быстрее, а вред — глубже и долгосрочнее" },
          { emoji: "📉", title: "Колоссальный ущерб", text: "Алкоголь — причина сотен болезней, миллионов смертей, сломанных семей и огромного экономического урона обществу" },
          { emoji: "🌱", title: "Выход есть", text: "Зависимость поддаётся лечению. Чем раньше обратиться за помощью — тем лучше прогноз. Тысячи людей ежегодно побеждают болезнь" },
          { emoji: "💡", title: "Профилактика — лучшая защита", text: "Знание, здоровое окружение и занятость — самые надёжные инструменты против алкоголизма" },
        ]} />
        <div className="mt-7 border-t border-[#2a2030] pt-5">
          <p className="font-cormorant text-xl italic text-[#6a5f5f] mb-3">
            «Здоровье — единственная роскошь, которую нельзя купить после того, как её потерял.»
          </p>
          <p className="text-[#4a3f3f] text-sm">Выполнил: <span className="text-[#6a5f5f]">Илья Садомов, 9Д</span> · Руководитель: <span className="text-[#6a5f5f]">Екатерина Геннадьевна</span></p>
        </div>
      </Slide>
    ),
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  const downloadPptx = async () => {
    setDownloading(true);
    const res = await fetch(PPTX_URL);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alkogol_i_zdorovye.pptx";
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

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
        <div className="flex items-center gap-3">
          <span className="text-[#4a3f3f] text-sm">{current + 1} / {slides.length}</span>
          <button
            onClick={downloadPptx}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2a2030] text-[#6a5f5f] hover:text-[#e8e0d5] hover:border-[#c8332a]/40 disabled:opacity-50 transition-colors text-xs font-medium"
          >
            <Icon name={downloading ? "Loader" : "Download"} size={14} className={downloading ? "animate-spin" : ""} />
            {downloading ? "Генерация..." : "Скачать .pptx"}
          </button>
        </div>
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
        <div className="flex gap-2 flex-wrap justify-center">
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
