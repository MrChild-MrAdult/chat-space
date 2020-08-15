FactoryBot.define do
  factory :message do
    comment {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/python.png")}
    user
    group
  end
end