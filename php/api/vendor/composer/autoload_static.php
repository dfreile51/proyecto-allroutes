<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit648a80e1032901459c9a2d0cf4ab0914
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit648a80e1032901459c9a2d0cf4ab0914::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit648a80e1032901459c9a2d0cf4ab0914::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit648a80e1032901459c9a2d0cf4ab0914::$classMap;

        }, null, ClassLoader::class);
    }
}
