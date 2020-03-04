import java.util.Scanner;

interface UGC {

int percentage,
Scanner sc=new Scanner(System.in);
default int getAddmission(){
    percentage=sc.nextInt();
    if(percentage>=60){
        registration_no=Math.random();
        return 0;
    }
}
int payfee();

}
interface AICTE{
    default int getAddmission(){
   
        LocalDate dd=LocalDate.now().plusDays(5);
        System.out.prinln("You are required to join the councelling by "+dd);
        return token_number;
    }
    int payfee();
    y
}