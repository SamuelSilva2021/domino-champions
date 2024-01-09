# domino-champions
Domino Champions! Application for a doubles domino championship.

This application was created to meet the needs of a domino championship among friends and relatives.

For the front-end, I used React and Tailwind CSS, and for the back-end, I used a REST API in .NET Core and SQLite to store the data.

Possible future implementations may come later.

Here we have the player registration screen. It is possible to filter a player by name, register, edit, and delete a player.

![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/dd37d57c-6b0e-44ab-a1df-f0648114006c)

Doubles Screen:
Here you can filter a doubles team by name, add a team with registered players, edit, and delete the team.

![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/e7cf2c6b-9c94-43e6-8ba9-d1643df2e4c1)

![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/c9875ec5-18f3-426d-af3d-a7725a3b032b)

There is also a validation to prevent the same player from being included in different doubles teams, so they can only be part of one team.
![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/c0a29c0c-b846-4794-b4c2-c59416b27c22)

In the match screen, we generate the matches randomly, with each team playing against every other team, based on the number of registered and enabled teams for the match table.
![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/ee85486d-f297-43b3-a14a-5914707c7426)

With the generated match table, it is possible to enter the score of each player per match, which, when summed, becomes the points for the corresponding team.
![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/2c26ad41-b794-4dfa-bd2d-206b04e86113)

When a match is completed, it disappears from the match screen and appears on the main screen, where you can track all ongoing and completed matches.
![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/0dba6b9a-2f23-411c-8b83-233c7d73a507)
![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/31e7196d-fa71-4240-a83c-dee9d81e844c)

On the main screen, it is also possible to track the championship table and the ranking of the top scorers.
![image](https://github.com/SamuelSilva2021/domino-champions/assets/79856359/772afcf1-4281-4cc4-974b-cfee39bd9aff)








