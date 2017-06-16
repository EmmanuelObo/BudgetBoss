from lists.models import List


class FileManager():
    mode = 'w'
    def export(self, List, extension):
        file = open(List.title + extension, self.mode)

        print('INSIDE FileManager')
        for item in List.item_set():
            file.write(item.name + ' -- ' + '$' + str(item.cost) + ' -- ' + item.priority + '\n')

        print('File successfully created')