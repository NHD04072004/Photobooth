"""
ERROR: ignore this file
"""

import os
import fnmatch
from PIL import ImageFont
from difflib import SequenceMatcher


def get_available_fonts():
    """Return the list of available fonts.
    """
    fonts_list = []
    for font_file in os.listdir(EMBEDDED_FONT_PATH):
        if fnmatch.fnmatch(font_file, '*.ttf'):
            fonts_list.append(os.path.splitext(os.path.basename(font_file))[0])

    fonts_list.extend(font.get_fonts())

    return sorted(fonts_list, key=lambda s: s.lower())


def get_filename(name):
    """Return absolute path to a font definition file located in the current
    package.
    """
    if os.path.isfile(name):
        return name

    embedded_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), name)
    if embedded_path and os.path.isfile(embedded_path):
        return embedded_path

    elif embedded_path and os.path.isfile(embedded_path + '.ttf'):
        return embedded_path + '.ttf'

    system_path = font.match_font(name)
    if system_path and os.path.isfile(system_path):
        return system_path

    # Show available fonts
    most_similar = None
    most_similar_ratio = 0
    for font_name in get_available_fonts():
        sim = SequenceMatcher(None, font_name, name).ratio()  # Similarity
        if sim > most_similar_ratio:
            most_similar = font_name
            most_similar_ratio = sim
    raise ValueError('System font "{0}" unknown, maybe you mean "{1}"'.format(name, most_similar))


def get_pil_font(text, font_name, max_width, max_height) -> ImageFont.truetype:
    """Create the PIL font object which fit the text to the given rectangle.

    :param text: text to draw
    :type text: str
    :param font_name: name or path to font definition file
    :type font_name: str
    :param max_width: width of the rect to fit
    :type max_width: int
    :param max_height: height of the rect to fit
    :type max_height: int

    :return: PIL.Font instance
    :rtype: object
    """
    start, end = 0, int(max_height * 2)
    while start < end:
        k = (start + end) // 2
        font = ImageFont.truetype(font_name, k)
        left, top, right, bottom = font.getbbox(text)
        width = right - left
        height = bottom - top
        font_size = (width, height)
        if font_size[0] > max_width or font_size[1] > max_height:
            end = k
        else:
            start = k + 1
    return ImageFont.truetype(font_name, start)
