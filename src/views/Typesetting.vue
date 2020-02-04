<template>
  <div class="typesetting">
    <div
      class="typesetting__demo"
      v-for="style in styles"
      :key="style.fontFamily"
      :style="style"
    >
      <h1>{{ style.fontFamily }}</h1>
      <p v-for="(paragraph, index) in demoText" :key="index">{{ paragraph }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Typesetting",

  computed: {
    styles() {
      return this.fonts.map(
        ([
          fontFamily,
          fontSize = "14px",
          lineHeight = 1.6,
          color = "#545454",
          letterSpacing = "0px",
          fontWeight = "400"
        ]) => ({
          fontFamily,
          fontSize,
          lineHeight,
          color,
          letterSpacing,
          fontWeight
        })
      );
    }
  },

  data() {
    return {
      demoText: [
        "In 1923, Bertha A. Lively and Sidney L. Pressey published the first reading ease formula. They were concerned that junior high school science textbooks had so many technical words. They felt that teachers spent all class time explaining these words. They argued that their formula would help to measure and reduce the “vocabulary burden” of textbooks. Their formula used five variable inputs and six constants. For each thousand words, it counted the number of unique words, the number of words not on the Thorndike list, and the median index number of the words found on the list. Manually, it took three hours to apply the formula to a book.[25] ",
        "After the Lively–Pressey study, people looked for formulas that were more accurate and easier to apply. By 1980, over 200 formulas were published in different languages.[26][citation needed] In 1928, Carleton Washburne and Mabel Vogel created the first modern readability formula. They validated it by using an outside criterion, and correlated .845 with test scores of students who read and liked the criterion books.[27] It was also the first to introduce the variable of interest to the concept of readability.[28] ",
        "Between 1929 and 1939, Alfred Lewerenz of the Los Angeles School District published several new formulas.[29][30][31][32][33] ",
        "In 1934, Edward Thorndike published his formula. He wrote that word skills can be increased if the teacher introduces new words and repeats them often.[34] In 1939, W.W. Patty and W. I Painter published a formula for measuring the vocabulary burden of textbooks. This was the last of the early formulas that used the Thorndike vocabulary-frequency list.[35]"
      ],
      fonts: [
        ["Vesper Libre"],
        ["Rasa", "15px", undefined, "#484848"],
        ["Alegreya", "14px", 1.9, "#585858", "0.02em", 500],
        ["Crimson Pro", "15px", undefined, "#505050"],
        // ["Solway", "13px", 1.8, undefined, "-0.02em"],
        ["Eczar", "13px", 1.8, "#5f5f5f", "0.02em"],
        // ["Yrsa", "15px", undefined, "#484848"], // Latin only version of Rasa
        // ["Spectral", "13px", 1.8, "#505050"],
        ["Neuton", "15px", 1.8, undefined, "0.02em"],
        ["Vollkorn", undefined, 1.8]
      ]
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Alegreya:400,500|Crimson+Pro:300,400,500|Eczar:400,500|Neuton:300,400,700|Rasa:400,500|Vesper+Libre:400,500|Vollkorn:400,600|Alegreya:400,500&display=swap&subset=cyrillic,cyrillic-ext,devanagari,greek,greek-ext,gujarati,latin-ext,vietnamese");

.typesetting {
  &__demo {
    margin: 48px 16px;
  }
}
</style>
