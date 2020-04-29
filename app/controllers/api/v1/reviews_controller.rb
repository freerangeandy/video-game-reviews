class Api::V1::ReviewsController < ApplicationController
  def index
  end

  def create
    review = Review.new(reviews_params)

    if review.save
      render json: review
    else
      render json: {error: review.errors.full_messages.to_sentence}
    end
  end

  private

  def reviews_params
    params.require(:review).permit(:rating, :comment, :game_id)
  end
end