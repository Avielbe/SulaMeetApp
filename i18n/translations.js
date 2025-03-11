// i18n/translations.js

export const translations = {
    // General (for Not Found and common texts)
    notFound: {
      title: {
        en: "This screen doesn't exist.",
        he: "מסך זה אינו קיים."
      },
      link: {
        en: "Go to home screen!",
        he: "חזור למסך הבית!"
      }
    },
    // Home Screen (index.tsx)
    home: {
      headerTitle: {
        en: "SulaMeet Home",
        he: "סולאמיט - בית"
      },
      welcome: {
        en: "Welcome to the Ultimate Question Challenge!",
        he: "ברוכים הבאים לאתגר השאלות האולטימטיבי!"
      },
      button: {
        selection: {
          en: "Choose Your Adventure",
          he: "בחר את ההרפתקה שלך"
        },
        mix: {
          en: "Mix It Up Challenge",
          he: "אתגר השילוב"
        }
      }
    },
    // Selection Screen (selection.tsx)
    selection: {
      title: {
        en: "Choose a Game Mode",
        he: "בחר מצב משחק"
      },
      button: {
        trivia: {
          en: "Trivia Questions",
          he: "שאלות טריוויה"
        },
        partner: {
          en: "Partner Questions",
          he: "שאלות שותפים"
        },
        miniGame: {
          en: "Mini Game",
          he: "משחק קטן"
        }
      }
    },
    // Trivia Screen (trivia.tsx)
    trivia: {
      headerTitle: {
        en: "TRIVIA MASTER",
        he: "אדון הטריוויה"
      },
      feedback: {
        correct: {
          en: "Correct!",
          he: "נכון!"
        },
        wrong: {
          en: "Wrong!",
          he: "לא נכון!"
        },
        timeout: {
          en: "Time's up!",
          he: "נגמר הזמן!"
        }
      },
      scoreLabel: {
        correct: {
          en: "Correct",
          he: "נכון"
        },
        wrong: {
          en: "Wrong",
          he: "לא נכון"
        }
      }
    },
    // Partner Screen (partner.tsx)
    partner: {
      headerTitle: {
        en: "Partner Challenge",
        he: "אתגר שותפים"
      },
      button: {
        completed: {
          en: "Completed",
          he: "הושלם"
        },
        notCompleted: {
          en: "Not Completed",
          he: "לא הושלם"
        }
      },
      feedback: {
        success: {
          en: "Great job!",
          he: "כל הכבוד!"
        },
        failure: {
          en: "Maybe next time.",
          he: "אולי בפעם הבאה."
        },
        timeout: {
          en: "Time's up!",
          he: "נגמר הזמן!"
        }
      }
    },
    // Mini Game Screen (mini-game.tsx)
    miniGame: {
      headerTitle: {
        en: "Mini Game Challenge",
        he: "אתגר משחק קטן"
      },
      button: {
        completed: {
          en: "Completed",
          he: "הושלם"
        },
        notCompleted: {
          en: "Not Completed",
          he: "לא הושלם"
        }
      },
      feedback: {
        success: {
          en: "Well done!",
          he: "כל הכבוד!"
        },
        failure: {
          en: "Maybe next time.",
          he: "אולי בפעם הבאה."
        },
        timeout: {
          en: "Time's up!",
          he: "נגמר הזמן!"
        }
      }
    },
    // Mix Screen (mix.tsx)
    mix: {
      headerTitle: {
        en: "Mix Challenge",
        he: "אתגר השילוב"
      },
      button: {
        completed: {
          en: "Completed",
          he: "הושלם"
        },
        notCompleted: {
          en: "Not Completed",
          he: "לא הושלם"
        }
      },
      feedback: {
        trivia: {
          correct: {
            en: "Correct!",
            he: "נכון!"
          },
          wrong: {
            en: "Wrong!",
            he: "לא נכון!"
          }
        },
        partner: {
          success: {
            en: "Great job!",
            he: "כל הכבוד!"
          },
          failure: {
            en: "Maybe next time.",
            he: "אולי בפעם הבאה."
          }
        },
        mini: {
          success: {
            en: "Well done!",
            he: "כל הכבוד!"
          },
          failure: {
            en: "Maybe next time.",
            he: "אולי בפעם הבאה."
          }
        },
        timeout: {
          en: "Time's up!",
          he: "נגמר הזמן!"
        }
      }
    },
    // Explore Screen (explore.tsx)
    explore: {
      title: {
        en: "About This App",
        he: "אודות האפליקציה"
      },
      content: {
        en: "Welcome to SulaMeet Lite – a streamlined, fun version of the full SulaMeet game, available at www.sulameet.com.\n\nHello, my name is Aviel Ben-Eliyahu, and I am a software and mobile developer. This app is designed to provide you with a taste of our exciting question challenges, mini games, and partner tasks.\n\nFor any questions or requests, please contact me by email: mymail@gmail.com.",
        he: "ברוכים הבאים ל-SulaMeet Lite – גרסה פשוטה ומהנה של משחק SulaMeet המלא, שניתן למצוא ב-www.sulameet.com.\n\nשלום, שמי אביאל בן-אליהו, ואני מפתח תוכנה ומובייל. אפליקציה זו נועדה לתת לכם טעימה מהאתגרים המרגשים שלנו, משחקי שאלות, משחקי שותפים ומשימות זוגיות.\n\nלכל שאלה או בקשה, אנא צרו איתי קשר בדוא\"ל: mymail@gmail.com."
      }
    },
    // Final Screen (final.tsx)
    final: {
      headerTitle: {
        en: "Congratulations!",
        he: "מזל טוב!"
      },
      scoreText: {
        en: "Your Total Score:",
        he: "הניקוד הכולל שלך:"
      },
      button: {
        share: {
          en: "Share Your Score",
          he: "שתף את הניקוד שלך"
        },
        playAgain: {
          en: "Play Again",
          he: "שחק שוב"
        }
      },
      shareMessage: {
        en: (score) => `I scored ${score} points in the Ultimate Question Challenge! Can you beat me?`,
        he: (score) => `השגתי ${score} נקודות באתגר השאלות האולטימטיבי! האם תוכל להקדים אותי?`
      }
    }
  };
  