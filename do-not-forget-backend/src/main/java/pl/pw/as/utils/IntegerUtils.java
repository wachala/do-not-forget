package pl.pw.as.utils;

public final class IntegerUtils {
    public static boolean isInRange(int toCheck, int min, int max) {
        return toCheck >= min && toCheck <= max;
    }
}
