class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.string :image
      t.string :number_of_players
      t.string :description
      t.string :creator
      t.string :platform
      t.string :genre
      t.string :site
      t.date :release_date

      t.timestamps null: false
    end
  end
end
