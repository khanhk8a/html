// Khai báo lớp Book

class Book {
    constructor(name, review, link1, link2, link3, link4, link5) {
        this.name = name;
        this.review = review;
        this.link1 = link1;
        this.link2 = link2;
        this.link3 = link3;
        this.link4 = link4;
        this.link5 = link5;
    }

    getName() {
        return `${this.name}`;
    }

    setName(name) {
        this.name = name;
    }

    getReview() {
        return `${this.review}`;
    }

    setReview(review) {
        this.review = review;
    }

    getLink1() {
        return `${this.link1}`;
    }

    setLink1(link1) {
        this.link1 = link1;
    }

    getLink2() {
        return `${this.link2}`;
    }

    setLink2(link2) {
        this.link2 = link2;
    }

    getLink3() {
        return `${this.link3}`;
    }

    setLink3(link3) {
        this.link3 = link3;
    }

    getLink4() {
        return `${this.link4}`;
    }

    setLink4(link4) {
        this.link4 = link4;
    }

    getLink5() {
        return `${this.link5}`;
    }

    setLink5(link5) {
        this.link5 = link5;
    }
}

// Xuất đối tượng Book để sử dụng ở các file khác
module.exports = Book;
