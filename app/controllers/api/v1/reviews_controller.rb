class Api::V1::ReviewsController < ApplicationController
  before_action :authorize_user, except: [:index, :show, :create]

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

  def destroy
    review = Review.find(params[:id])
    game = review.game
    review.delete
    render json: game
  end

  private

  def reviews_params
    params.require(:review).permit(:rating, :comment, :game_id)
  end

  def authorize_user
    if !user_signed_in || !current_user.admin?
      render json: {error: "Not available"}
    end
  end
end
