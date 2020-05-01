require 'rails_helper'

describe Review do
  let!(:mario) { Game.create(title: "Super Mario Galaxy") }
  let!(:flimflam) { User.create(user_name: "flimflam", password: "2complex4u", password_confirmation: "2complex4u", email: "this@isntreal.com") }

  let!(:review_blank) { Review.new }
  let!(:review_rating) { Review.create(rating: 3) }
  let!(:review_rating_comment) { Review.create(rating: 2, comment: "Bad game.", user: flimflam) }
  let!(:review_no_comment) {Review.create(rating: 1, game: mario, user: flimflam) }

  let!(:review1) { Review.create(rating: 4, comment: "Good game.", game: mario, user: flimflam) }
  let!(:review2) { Review.create(rating: 5, comment: "Great game.", game: mario, user: flimflam) }

  describe "review model correctly validates" do
    it "blank review is not valid" do
      expect(review_blank.valid?).to eq(false)
    end
    it "review with just a rating is not valid" do
      expect(review_rating.valid?).to eq(false)
    end
    it "review with just a rating and comment is not valid" do
      expect(review_rating_comment.valid?).to eq(false)
    end
    it "review without a comment is valid" do
      expect(review_no_comment.valid?).to eq(true)
    end
    it "review with all properties is valid" do
      expect(review1.valid?).to eq(true)
      expect(review2.valid?).to eq(true)
    end
  end

  describe "#rating" do
    it "should return a valid rating" do
      expect(review1.rating).to eq(4)
      expect(review2.rating).to eq(5)
    end
  end

  describe "#comment" do
    it "should return a valid comment" do
      expect(review1.comment).to eq("Good game.")
      expect(review2.comment).to eq("Great game.")
    end
  end

  describe "#game" do
    it "should return a valid game" do
      expect(review1.game).to eq(mario)
      expect(review2.game).to eq(mario)
    end
  end


end
