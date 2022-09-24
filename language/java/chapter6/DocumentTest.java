package chapter6;

class Document {
    static int count = 0;
    String name;

    Document() {
        this("제목없음" + ++count);
    }

    Document(String name) {
        this.name = name;
        System.out.println(this.name);
    }
}

class DocumentTest {
    public static void main(String[] args) {
        new Document("Temp");
        for (int i = 0; i < 5; i++) {
            new Document();
        }
    }
}
