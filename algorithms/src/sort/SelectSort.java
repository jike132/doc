package sort;

/*
动态规划

 */
public class SelectSort {
    public static void main(String args[]) {
        int[] a = {2, 8, 4, 6, 1};
        selectSort(a);
    }

    public static int[] selectSort(int[] coparable) {
        int min;
        for (int i = 0; i < coparable.length; i++) {
            min = coparable[i];
            for (int j = i + 1; j < coparable.length; j++) {
                if (coparable[j] < min){
                    min=coparable[j];
                    int tem = coparable[i];
                    coparable[i] =coparable[j];
                    coparable[j] =tem;
                }
            }
        }
        return coparable;
    }

}
