class Api::V1::ReviewsController < ApplicationController
  before_action :authorize_user, except: [:index, :show, :create]

  def index
  end

  def create
    review = Review.new(reviews_params)
    if !current_user.nil?
      review.user = current_user
    end

    if review.save
      render json: review
    else
      render json: {error: review.errors.full_messages.to_sentence}
    end
  end

  def destroy
    is_admin = current_user.role == "admin"
    review_by_current_user = current_user.reviews.exists?(params[:id])
    if review_by_current_user || is_admin
      review = Review.find(params[:id])
      game = review.game
      review.delete
      render json: game
    end
  end

  private

  def reviews_params
    params.require(:review).permit(:rating, :comment, :game_id, :user_id)
  end

  def authorize_user
    if !user_signed_in?
      render json: {error: "Not available"}
    end
  end
end
