require 'rails_helper'

feature 'test models' do
  let!(:mario) { Game.create(title: "Super Mario Galaxy") }
  let!(:review1) { Review.create(rating: 4, comment: "Good game.", game: mario) }
  let!(:review2) { Review.create(rating: 5, comment: "Great game.", game: mario) }

  it 'should return the correct properties' do
    expect(review1.rating).to eq(4)
    expect(review1.comment).to eq("Good game.")

    expect(review2.rating).to eq(5)
    expect(review2.comment).to eq("Great game.")

    expect(review1.game).to eq(mario)

    expect(mario.title).to eq("Super Mario Galaxy")
    expect(mario.reviews.length).to eq(2)
  end
end
