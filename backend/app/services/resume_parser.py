import fitz
from docx import Document


def extract_resume_text(file):

    filename = file.filename.lower()

    if filename.endswith(".pdf"):

        pdf = fitz.open(
            stream=file.read(),
            filetype="pdf"
        )

        text = ""

        for page in pdf:

            text += page.get_text()

        pdf.close()

        return text

    elif filename.endswith(".docx"):

        document = Document(file)

        text = ""

        for paragraph in document.paragraphs:

            text += paragraph.text + "\n"

        return text

    raise ValueError("Unsupported file type.")