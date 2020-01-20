package sort;

/*
分治策略：
时间复杂度：o(NlogN)
 */
public class QuikSort {
    public static void main(String args[]) {

    }

    public static int[] cQuikSort(int[] coparable, int lo, int hi) {//普通快速排序
        int axis = coparable[lo];
        if (lo >= hi) return coparable;
        if (coparable == null) return null;
        int i=lo+1;
          while (coparable[i] < axis) {
              swap(coparable[lo],coparable[i]);
              i++;

          }
//          while ()
//           if (lo==hi)cQuikSort(coparable,lo,);


        return coparable;
    }

    public static void swap(int a, int b) {
        int tem = a;
        a = b;
        b = tem;
    }

    public static int[] rQuikSort(int[] copareTable) {//随机快速排序
        return null;
    }

    public static int[] partition(int[]  coparable, int lo, int hi) {

        return coparable;
    }
}
