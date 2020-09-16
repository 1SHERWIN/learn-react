package com.jpmc.perotMuseumScavengerHunt.service;

import com.jpmc.perotMuseumScavengerHunt.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import java.sql.ResultSet;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Create new user entry in database with false/null values and randomly generated nickname
    // Arguments: user-input string name
    // Return Values: string nickname
    public String createUser(String name) {
        // Retrieve random adjective from db table
        String getAdjective = "select * from adjectives order by rand() limit 1;";
        String adjective = (String) jdbcTemplate.queryForObject(
                getAdjective, new Object[]{}, String.class);

        // Retrieve random animal from db table
        String getAnimal = "select * from animals order by rand() limit 1;";
        String animal = (String) jdbcTemplate.queryForObject(
                getAnimal, new Object[]{}, String.class);

        String nickname = adjective + animal;

        jdbcTemplate.update("INSERT INTO users (nickname, name, checkpoint_1, checkpoint_2, checkpoint_3," +
                        "checkpoint_4, checkpoint_5, checkpoint_completion, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                 nickname + "", name, false, false, false, false, false, false, null);

        // Validation (no special characters, no numbers)
        boolean valid = (name != null) && name.matches("[A-Za-z]+");
        if (!valid) {
            return "INVALID";
        }
        return nickname;
    }

    // Get user information from the database
    // Arguments: user-input nickname (previously given when created user)
    // Return Values: user object with all attributes, or user object with null values if not found
    public User getUser(String nickname) {
        // Take account for case where nickname is entered with a space
        nickname = nickname.replaceAll(" ", "").toLowerCase();

        User userObj = new User();
        RowMapper<User> rm = (RowMapper<User>) (ResultSet result, int rowNum) -> {

            User user = new User();

            user.setNickname(result.getString("nickname"));
            user.setName(result.getString("name"));
            user.setCheckpoint1(result.getBoolean("checkpoint_1"));
            user.setCheckpoint2(result.getBoolean("checkpoint_2"));
            user.setCheckpoint3(result.getBoolean("checkpoint_3"));
            user.setCheckpoint4(result.getBoolean("checkpoint_4"));
            user.setCheckpoint5(result.getBoolean("checkpoint_5"));
            user.setCompletionStatus(result.getBoolean("checkpoint_completion"));
            user.setEmail(result.getString("email"));

            return user;
        };

        int userMatchCount = jdbcTemplate.queryForObject("SELECT count(*) FROM users WHERE nickname=?",
                new Object[]{nickname}, Integer.class);

        // If user object exists in database, query and return user object
        if(userMatchCount != 0){
            userObj = jdbcTemplate.queryForObject("SELECT * FROM users WHERE nickname=?", new Object[]{nickname}, rm);
            return userObj;
        }

        // Otherwise, return empty user object
        return userObj;
    }

    // Update a user's progress during the scavenger hunt
    // Arguments: String name value representing checkpoint, String value representing user
    // Return Values: int values representing status of update success and completion status
    // -2 : update not successful (int argument not valid)
    // -1 : update not successful (nickname does not exist)
    //  0 : update successful, checkpoints not completed
    //  1 : update successful, checkpoints completed
    public int updateProgress(String checkpoint, String nickname) {
        // Make sure nickname matches, and matches only one entry
        int nicknameMatchCount = jdbcTemplate.queryForObject("SELECT count(*) FROM users WHERE nickname=?",
                new Object[]{nickname}, Integer.class);
        List<String> validCheckpoints = Arrays.asList("checkpoint 1", "checkpoint 2", "checkpoint 3", "checkpoint 4",
                "checkpoint 5");
        if (nicknameMatchCount == 1) {
            if (validCheckpoints.contains(checkpoint)){
                String columnName = checkpoint.replaceAll(" ", "_").toLowerCase();
                jdbcTemplate.update("UPDATE users SET " + columnName + "=" + true + " WHERE nickname='" + nickname + "'");
            }
            // Invalid integer entered
            else {
                return -2;
            }
        }
        // Non-singular nickname validation
        else {
            return -1;
        }

        // Query database for map where key (String) represents checkpoint names and the values (Object) represent
        // boolean checkpoint values
        Map<String, Object> checkpoints = jdbcTemplate.queryForMap("SELECT checkpoint_1,checkpoint_2,checkpoint_3," +
                "checkpoint_4,checkpoint_5 FROM users WHERE nickname='" + nickname + "'");

        // Loops through the map to check if there is a false value
        for(String key: checkpoints.keySet()){
            if(!((Boolean) checkpoints.get(key))){
                // Progress is updated, game has not been completed
                return 0;
            }
        }

        // Update checkpoint completion status and show users that game has been completed
        jdbcTemplate.update("UPDATE users SET checkpoint_completion=" + true + " WHERE nickname='" + nickname + "'");
        return 1;
    }

    // Update a user's email after completing game
    // Arguments: user-input email, string unique nickname
    // Return Values: int that represents whether update was successful or not and corresponding error
    public int updateEmail(String email, String nickname) {
        int emailStoredStatus = 0;
        String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);

        int emailMatchCount = jdbcTemplate.queryForObject("SELECT count(*) FROM users WHERE email=?",
                new Object[]{email}, Integer.class);

        // Validation (ex. require @ sign, not already existing)
        if(matcher.matches() && (emailMatchCount == 0)){
            // UPDATE DB
            jdbcTemplate.update("UPDATE users SET email='" + email + "' WHERE nickname='" + nickname + "'");
            emailStoredStatus = 0;
        }
        else if(!matcher.matches()){
            // Invalid email ID entered
            emailStoredStatus = -1;
        }
        else if(emailMatchCount > 0){
            // Email is already in database for another nickname
            emailStoredStatus = -2;
        }
        return emailStoredStatus;
    }

}
