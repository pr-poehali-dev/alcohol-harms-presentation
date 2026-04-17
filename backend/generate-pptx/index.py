"""Генерация PPTX-файла презентации об алкоголе и здоровье."""
import base64
import io
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN


BG = RGBColor(0x0D, 0x0F, 0x14)
RED = RGBColor(0xC8, 0x33, 0x2A)
LIGHT = RGBColor(0xE8, 0xE0, 0xD5)
GRAY = RGBColor(0x9A, 0x8F, 0x8A)
DIM = RGBColor(0x6A, 0x5F, 0x5F)
GREEN = RGBColor(0x3A, 0xAA, 0x70)


def set_bg(slide, prs):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = BG


def add_text(tf, text, size, bold=False, color=LIGHT, align=PP_ALIGN.LEFT, italic=False):
    p = tf.add_paragraph()
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return p


def add_title_slide(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_bg(slide, prs)
    W, H = prs.slide_width, prs.slide_height

    # Заголовок
    tb = slide.shapes.add_textbox(Inches(1), Inches(1.8), W - Inches(2), Inches(1.6))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "Алкоголь — угроза здоровью"
    run.font.size = Pt(40)
    run.font.bold = True
    run.font.color.rgb = LIGHT

    # Подзаголовок
    tb2 = slide.shapes.add_textbox(Inches(1), Inches(3.5), W - Inches(2), Inches(0.6))
    tf2 = tb2.text_frame
    p2 = tf2.paragraphs[0]
    p2.alignment = PP_ALIGN.CENTER
    r2 = p2.add_run()
    r2.text = "Факты, статистика и методы профилактики"
    r2.font.size = Pt(18)
    r2.font.color.rgb = GRAY

    # Линия-разделитель (тонкий прямоугольник)
    line = slide.shapes.add_shape(1, Inches(2.5), Inches(4.3), W - Inches(5), Pt(2))
    line.fill.solid()
    line.fill.fore_color.rgb = RED
    line.line.fill.background()

    # Автор
    tb3 = slide.shapes.add_textbox(Inches(1), Inches(4.6), W - Inches(2), Inches(0.9))
    tf3 = tb3.text_frame
    p3 = tf3.paragraphs[0]
    p3.alignment = PP_ALIGN.CENTER
    r3 = p3.add_run()
    r3.text = "Выполнил: Илья Садомов, 9Д"
    r3.font.size = Pt(14)
    r3.font.color.rgb = LIGHT

    p4 = tf3.add_paragraph()
    p4.alignment = PP_ALIGN.CENTER
    r4 = p4.add_run()
    r4.text = "Руководитель: Екатерина Геннадьевна"
    r4.font.size = Pt(14)
    r4.font.color.rgb = GRAY


def add_content_slide(prs, label, title, bullets, bullet_color=LIGHT):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_bg(slide, prs)
    W = prs.slide_width

    # Метка
    tb_label = slide.shapes.add_textbox(Inches(0.6), Inches(0.3), Inches(4), Inches(0.4))
    tf_l = tb_label.text_frame
    p_l = tf_l.paragraphs[0]
    r_l = p_l.add_run()
    r_l.text = label.upper()
    r_l.font.size = Pt(9)
    r_l.font.bold = True
    r_l.font.color.rgb = RED

    # Заголовок
    tb_title = slide.shapes.add_textbox(Inches(0.6), Inches(0.7), W - Inches(1.2), Inches(1.2))
    tf_t = tb_title.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    r_t = p_t.add_run()
    r_t.text = title
    r_t.font.size = Pt(32)
    r_t.font.bold = True
    r_t.font.color.rgb = LIGHT

    # Буллеты
    tb_body = slide.shapes.add_textbox(Inches(0.6), Inches(2.1), W - Inches(1.2), Inches(4.5))
    tf_b = tb_body.text_frame
    tf_b.word_wrap = True
    first = True
    for bullet in bullets:
        if first:
            p = tf_b.paragraphs[0]
            first = False
        else:
            p = tf_b.add_paragraph()
        p.space_before = Pt(6)
        run = p.add_run()
        run.text = bullet
        run.font.size = Pt(16)
        run.font.color.rgb = bullet_color


def handler(event: dict, context) -> dict:
    """Генерирует PPTX-файл презентации и возвращает его в base64."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }

    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)

    # Слайд 1: Титул
    add_title_slide(prs)

    # Слайд 2: Введение
    add_content_slide(prs, "Введение", "Что такое алкоголь?", [
        "🍷  Этанол — психоактивное вещество, вызывающее зависимость",
        "⚠️  ВОЗ признаёт алкоголь канцерогеном 1-й группы — наравне с табаком",
        "🌍  Ежегодно от алкоголя погибает более 3 миллионов человек в мире",
        "🇷🇺  Россия — в топ-10 стран по потреблению алкоголя на душу населения",
        "🎯  Цель: показать реальный вред и рассказать о профилактике",
    ])

    # Слайд 3: Статистика
    add_content_slide(prs, "Статистика и факты", "Цифры говорят сами за себя", [
        "📊  3 млн+ смертей в год в мире от алкоголя",
        "📊  5% всех смертей связаны с алкоголем",
        "📊  Алкоголь провоцирует более 200 заболеваний",
        "📊  43% дорожных аварий — по вине пьяных водителей",
        "🇷🇺  70% россиян употребляют алкоголь, 8% страдают алкоголизмом",
    ])

    # Слайд 4: Здоровье
    add_content_slide(prs, "Влияние на здоровье", "Алкоголь поражает каждый орган", [
        "🧠  Мозг: потеря памяти, депрессия, риск инсульта в 3 раза выше",
        "❤️  Сердце: аритмия, гипертония, риск инфаркта в 4 раза выше",
        "🫁  Печень: гепатит, цирроз — необратимое разрушение органа",
        "🛡️  Иммунитет: снижение защиты, рост онкологических рисков",
        "🦴  Кости: остеопороз, атрофия мышц, частые переломы",
        "⚠️  Нет безопасной дозы — любое количество алкоголя вредно (ВОЗ)",
    ])

    # Слайд 5: Профилактика
    add_content_slide(prs, "Методы профилактики", "Как защитить себя и близких?", [
        "👤  Осознать проблему и поставить цель",
        "👤  Заменить привычку — спорт, хобби, здоровый досуг",
        "👤  Выбрать поддерживающее окружение",
        "👤  Обратиться к врачу — зависимость лечится",
        "👨‍👩‍👧  Говорить с детьми о вреде алкоголя до 10 лет",
        "👨‍👩‍👧  Показывать личный пример и поддерживать близких",
        "📞  Горячая линия помощи: 8-800-200-0-200 (бесплатно)",
    ])

    # Слайд 6: Заключение
    add_content_slide(prs, "Заключение", "Выводы", [
        "🚫  Безопасной дозы алкоголя не существует — это научный факт",
        "🧠  Алкоголизм — болезнь мозга, а не слабость характера",
        "📉  Алкоголь — причина более 200 заболеваний и миллионов смертей",
        "🌱  Зависимость поддаётся лечению при своевременном обращении",
        "💡  Профилактика с детства — лучший способ защиты",
    ])

    buf = io.BytesIO()
    prs.save(buf)
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'Content-Disposition': 'attachment; filename="alkogol_i_zdorovye.pptx"',
        },
        'body': encoded,
        'isBase64Encoded': True,
    }
