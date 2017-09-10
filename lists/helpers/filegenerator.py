from io import BytesIO

from reportlab.pdfgen import canvas

from lists.models import List
from django.http import HttpResponse
import csv

class FileGenerator():
    mode = 'w'

    def __init__(self, ext, id, response):
        self.ext = ext
        self.id = id
        self.response = response

    def export(self):
        # file = open(List.title + extension, self.mode)
        #
        # print('INSIDE FileManager')
        # for item in List.item_set():
        #     file.write(item.name + ' -- ' + '$' + str(item.cost) + ' -- ' + item.priority + '\n')
        #
        # print('File successfully created')
        mylist = List.objects.get(pk=self.id)

        if self.ext == 'csv':
            filename = mylist.title + '.csv'

            self.response = HttpResponse(content_type='text/csv')
            self.response['Content-Disposition'] = 'attachment; filename=' + filename

            file_writer = csv.writer(self.response)

            file_writer.writerow(["NAME", "COST", "NOTE", "PRIORITY", "DATE CREATED"])

            for item in mylist.item_set.prioritize():
                file_writer.writerow([item.name, '$' + str(item.cost), item.note, item.priority, item.dateCreated])

            return self.response

        if self.ext == 'txt':
            filename = mylist.title + '.txt'

            self.response = HttpResponse(content_type='text/plain')
            self.response['Content-Disposition'] = 'attachment; filename=' + filename

            for item in mylist.item_set.prioritize():
                self.response.write(item.name + ' -- ' + '$' + str(item.cost) + ' -- ' + item.priority + '\n')

            return self.response

        if self.ext == 'pdf':
            self.response = HttpResponse(content_type='application/pdf')
            self.response['Content-Disposition'] = 'inline; filename="mypdf.pdf"'

            buffer = BytesIO()
            p = canvas.Canvas(buffer)

            # Start writing the PDF here
            p.drawString(70, 225, mylist.title)
            # End writing

            p.showPage()
            p.save()

            pdf = buffer.getvalue()
            buffer.close()
            self.response.write(pdf)

            return self.response

        else:
            print('Some other extension')