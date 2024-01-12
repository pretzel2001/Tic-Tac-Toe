#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

void collatz(int n) {
    printf("%d", n);
    while (n != 1) {
        if (n % 2 != 0) {
            n = 3 * n + 1;
        } else {
             n = n / 2;
        }
        printf(" %d ", n);
    }
    printf(" \n");
}
int main(int argc, char *argv[]) {
    printf("Enter a positive number: ");
    int n = 0;
    scanf("%d", &n);
    
    if (n <= 0) {
        fprintf(stderr, "Enter a positive number \n");
        return 1;
    }

    pid_t pid = fork();

    if (pid < 0) {
        fprintf(stderr, "Forking failed \n");
        return 1;
    } else if (pid == 0) {
        collatz(n);
    } else {
        wait(NULL); 
    }

    return 0;
}