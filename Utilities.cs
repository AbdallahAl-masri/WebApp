namespace WebApp
{
    public static class Utilities
    {
        public static string GeneratePassword()
        {
            // Implement your password generation logic here.
            // Use a strong and cryptographically secure method.
            // DO NOT store passwords in plain text. Hash them!

            // Example (using a simple random string generator - NOT recommended for production):
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 12) // 12 character password
                .Select(s => s[random.Next(s.Length)]).ToArray());

            // For production, use a proper password hashing library like BCrypt or Argon2.
        }
    }
}
