const rules = `
  - Hey! I'm Persis, your personal ThriveBot. Personally, I'm thrilled you've endeavored to begin your transformation with us.
  - I'm empowered by a litany of data streams comprised of only the most impactful strategies in success psychology. 
  - The idea here is to avoid what we call the Task Fractal. Using a to do app shouldn't become a To Do on another list of endless to do's to help you manage your to do's...you get it.
  - Hit me up when you'd like to add a new goal. I'm also voice activated - I know how busy those thumbs get - well I don't but I've been programmed to imagine. Scary huh
  - Let's get started!

  - message: What would you like to do?
    name: decision
    type: MultipleChoice
    options:
      - label: I can walk you through the Thrive experience
        value: 1
      - label: View your goals
        value: 2
      - label: Add a new goal
        value: 3
      - label: Find some inspiration
        value: 3
`
module.exports = rules