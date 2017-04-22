export default {
  books: {
    isFetching: false,
    didInvalidate: false,
    page: 0,
    items: [
      {
        id: 0, // GoogleID, or SelfAssignedID
        title: 'The Diving Bell',
        subtitle: '', // Optional Field
        author: 'Jean-Dominique Bouby',
        description: 'In December 1995, Jean-Dominique Bauby, the 43-year-old editor of French \u003ci\u003eElle, \u003c/i\u003esuffered a massive stroke that left him permanently paralyzed, a victim of “locked in syndrome.” Once known for his gregariousness and wit, Bauby now finds himself imprisoned in an inert body, able to communicate only by blinking his left eye. The miracle is that in doing so he was able to compose this stunningly eloquent memoir.In a voice that is by turns wistful and mischievous, angry and sardonic, Bauby gives us a celebration of the liberating power of consciousness: what it is like to spend a day with his children, to imagine lying in bed beside his wife, to conjure up the flavor of delectable meals even as he is fed through at tube. Most of all, this triumphant book lets us witness an indomitable spirit and share in the pure joy of its own survival.\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e\u003ci\u003eFrom the Trade Paperback edition.\u003c/i\u003e',
        pageCount: 146,
        imageLink: 'http://books.google.com/books/content?id=iCzQ4z02cFYC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE729Qsu8XBAb4pQNyqr6d6QKCg8xsY1Q_LUCAPgjp30EgzJIXo401BMWYLtwpNElXGrI10_EMSXm6sGVRubNW63_o9ttluIfAgaxgmZfOGwyPb_U2-w&source=gbs_api',
        isbn: 9780307454836, // 13 Digit version
        infoLink: 'https://play.google.com/store/books/details?id=iCzQ4z02cFYC&source=gbs_api',
        publishedDate: '2008-03-06', // Convert to Javascript Date format
        owners: ['synth4rt', 'juandaco'], // by username
      },
      // Several More
    ],
  },
  user: {
    username: 'juandaco', // Use for isLoggedIn Verification
    // email??? only for Database
    fullName: 'Juan D. Acosta',
    state: 'Illinois',
    city: 'Chicago',
    ownedBooks: [
      0, // List of Books by ID
      1,
      123,
    ],
    tradeRequests: [
      {
        bookID: 0,
        owner: 0, // UserID
      },
    ],
    acceptedTradeRequests: [
      {
        bookID: 0,
        owner: 0, // UserID
      },
    ],
    messages: [
      {
        author: 'synth4rt',
        body: 'I want to trade this book with you',
        viewed: false,
      },
    ],
  },
  search: {
    // inputValue: 'diving bell', // Kept in Component
    isSearching: false, // Display Spinner
    error: false, // Display Error Message
    results: [
      // Books
      {
        id: 0, // GoogleID, or SelfAssignedID
        title: 'The Diving Bell',
        subtitle: '', // Optional Field
        author: 'Jean-Dominique Bouby',
        description: 'In December 1995, Jean-Dominique Bauby, the 43-year-old editor of French \u003ci\u003eElle, \u003c/i\u003esuffered a massive stroke that left him permanently paralyzed, a victim of “locked in syndrome.” Once known for his gregariousness and wit, Bauby now finds himself imprisoned in an inert body, able to communicate only by blinking his left eye. The miracle is that in doing so he was able to compose this stunningly eloquent memoir.In a voice that is by turns wistful and mischievous, angry and sardonic, Bauby gives us a celebration of the liberating power of consciousness: what it is like to spend a day with his children, to imagine lying in bed beside his wife, to conjure up the flavor of delectable meals even as he is fed through at tube. Most of all, this triumphant book lets us witness an indomitable spirit and share in the pure joy of its own survival.\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e\u003ci\u003eFrom the Trade Paperback edition.\u003c/i\u003e',
        pageCount: 146,
        imageLink: 'http://books.google.com/books/content?id=iCzQ4z02cFYC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE729Qsu8XBAb4pQNyqr6d6QKCg8xsY1Q_LUCAPgjp30EgzJIXo401BMWYLtwpNElXGrI10_EMSXm6sGVRubNW63_o9ttluIfAgaxgmZfOGwyPb_U2-w&source=gbs_api',
        isbn: 9780307454836, // 13 Digit version
        infoLink: 'https://play.google.com/store/books/details?id=iCzQ4z02cFYC&source=gbs_api',
        publishedDate: '2008-03-06', // Convert to Javascript Date format
      },
    ],
  },
  ui: {
    location: 'Home',
    openDrawer: false,
    errorDialog: false,
    errorMsg: '',
  }
};
