class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.string :image
      t.string :number_of_players, default: "Data not provided"
      t.string :description, default: "Data not provided"
      t.string :creator, default: "Data not provided"
      t.string :platform, default: "Data not provided"
      t.string :genre, default: "Data not provided"
      t.string :site, default: "Data not provided"
      t.string :release_date, default: "Data not provided"

      t.timestamps null: false
    end
  end
end
